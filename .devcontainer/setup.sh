#!/bin/bash

echo "Setting up Home Assistant development environment..."
echo ""

# Create config directories if they don't exist
mkdir -p /config/www/xiaomi_smart_pet_fountain_2_card
mkdir -p /config/.storage

# Check if the dist folder has the card file
if [ -f /workspaces/xiaomi_smart_pet_fountain_2_card/dist/xiaomi-smart-pet-fountain-2-card.js ]; then
    echo "✅ Card file found in dist/ - copying to Home Assistant..."
    cp /workspaces/xiaomi_smart_pet_fountain_2_card/dist/xiaomi-smart-pet-fountain-2-card.js /config/www/xiaomi_smart_pet_fountain_2_card/
    echo "   Card copied successfully!"
    
    # Pre-configure the Lovelace resource
    echo "✅ Pre-configuring Lovelace resource..."
    cat > /config/.storage/lovelace_resources << 'EOF'
{
  "version": 1,
  "minor_version": 1,
  "key": "lovelace_resources",
  "data": {
    "items": [
      {
        "id": "xiaomi_smart_pet_fountain_2_card",
        "url": "/local/xiaomi_smart_pet_fountain_2_card/xiaomi-smart-pet-fountain-2-card.js",
        "type": "module"
      }
    ]
  }
}
EOF
    echo "   Lovelace resource pre-configured!"
else
    echo "⚠️  WARNING: Card file not found in dist/ folder"
    echo ""
    echo "   You need to build the card first!"
    echo "   On your HOST machine (Windows), run:"
    echo "   1. Open a terminal in the project folder"
    echo "   2. npm install"
    echo "   3. npm run build"
    echo ""
    echo "   The dist/ folder will be automatically mounted in Home Assistant."
fi

echo ""
echo "🚀 Starting Home Assistant in the background..."

# Start Home Assistant in the background
nohup python3 -m homeassistant --config /config > /config/home-assistant.log 2>&1 &

HASS_PID=$!
echo "   Home Assistant starting with PID: $HASS_PID"
echo ""
echo "✅ Setup complete!"
echo ""
echo "⏳ IMPORTANT: Home Assistant is starting up..."
echo "   This takes 1-2 minutes on first launch."
echo "   Please wait before accessing: http://localhost:8123"
echo ""
echo "💡 How to check if Home Assistant is ready:"
echo "   - Watch this terminal for Home Assistant logs"
echo "   - Look for: 'Home Assistant initialized in XXs'"
echo "   - Or check: http://localhost:8123 (refresh after 1-2 minutes)"
echo "   - Monitor logs: tail -f /config/home-assistant.log"
echo ""
echo "🔧 If http://localhost:8123 doesn't work after 5 minutes:"
echo "   1. Check process: ps aux | grep homeassistant"
echo "   2. Check logs: tail -f /config/home-assistant.log"
echo "   3. Verify port forwarding in VS Code (PORTS tab)"
echo ""
echo "📦 Card Resource Configuration:"
echo "   The card resource will be automatically registered in .storage/lovelace_resources"
echo ""
echo "📋 To view the card:"
echo "   1. Wait for Home Assistant to fully start (1-2 minutes)"
echo "   2. Open http://localhost:8123"
echo "   3. Complete onboarding (create account: admin / admin)"
echo "   4. Enable Advanced Mode: Profile (bottom left) → Enable Advanced Mode"
echo "   5. Go to: Overview dashboard"
echo "   6. The card is pre-configured in the dashboard!"
echo ""
echo "   Alternative: Manually add via UI:"
echo "   - Click the 3 dots (top right) → Edit Dashboard → Add Card"
echo "   - Scroll down and select 'Custom: Xiaomi Smart Pet Fountain Card'"
echo "   - Choose entity: select.xiaomi_iv02_b820_mode"
echo ""

# Give a moment for Home Assistant to start writing logs
sleep 3

# Show the last few lines of the log to confirm it's starting
if [ -f /config/home-assistant.log ]; then
    echo "📋 Home Assistant startup logs (last 20 lines):"
    echo "=============================================="
    tail -n 20 /config/home-assistant.log
fi
