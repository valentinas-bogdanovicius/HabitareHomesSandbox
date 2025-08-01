const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = 8000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret-here';

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// Webhook endpoint for GitHub
app.post('/webhook', (req, res) => {
    const signature = req.headers['x-hub-signature-256'];
    const payload = JSON.stringify(req.body);
    
    // Verify webhook signature (optional but recommended)
    if (WEBHOOK_SECRET && signature) {
        const expectedSignature = 'sha256=' + crypto
            .createHmac('sha256', WEBHOOK_SECRET)
            .update(payload)
            .digest('hex');
            
        if (signature !== expectedSignature) {
            console.log('Invalid webhook signature');
            return res.status(401).send('Unauthorized');
        }
    }
    
    // Check if this is a push to main branch
    if (req.body.ref === 'refs/heads/main') {
        console.log('📡 Webhook received: Push to main branch detected');
        
        updateRepository()
            .then(() => {
                console.log('✅ Repository updated successfully via webhook');
                res.status(200).send('OK');
            })
            .catch(error => {
                console.error('❌ Webhook update failed:', error.message);
                res.status(500).send('Update failed');
            });
    } else {
        console.log('📡 Webhook received: Not a main branch push, ignoring');
        res.status(200).send('Ignored');
    }
});

// Manual update endpoint
app.post('/api/update', (req, res) => {
    console.log('Manual update triggered...');
    updateRepository().then(() => {
        res.json({ success: true, message: 'Updated successfully' });
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// Status endpoint
app.get('/api/status', (req, res) => {
    exec('git rev-parse HEAD', (error, stdout) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ 
            currentCommit: stdout.trim(),
            serverRunning: true,
            timestamp: new Date().toISOString()
        });
    });
});

async function updateRepository() {
    return new Promise((resolve, reject) => {
        console.log('🔄 Pulling latest changes...');
        
        exec('git pull origin main', (error, stdout, stderr) => {
            if (error) {
                console.error('Git pull failed:', error.message);
                reject(error);
                return;
            }
            
            console.log('Git output:', stdout);
            if (stderr) console.log('Git stderr:', stderr);
            
            resolve();
        });
    });
}

app.listen(PORT, () => {
    console.log(`🚀 Habitare Homes webhook server running on http://localhost:${PORT}`);
    console.log(`🪝 Webhook endpoint: http://localhost:${PORT}/webhook`);
    console.log(`💡 Manual update: POST to http://localhost:${PORT}/api/update`);
    console.log(`📊 Status: GET to http://localhost:${PORT}/api/status`);
    
    if (!process.env.WEBHOOK_SECRET) {
        console.log('⚠️  Consider setting WEBHOOK_SECRET environment variable for security');
    }
});