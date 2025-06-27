#!/bin/bash

# Healthify Platform Development Setup Script
echo "🏥 Welcome to Healthify Platform Setup"
echo "======================================"

# Check Node.js version
echo "📋 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

echo "📦 Installing dependencies..."
npm install

echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start development services"
echo "2. Visit http://localhost:3000 to access the API Gateway"
