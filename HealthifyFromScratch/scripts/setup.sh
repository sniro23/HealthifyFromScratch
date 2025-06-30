#!/bin/bash

# Healthify Platform Development Setup Script
# This script sets up the complete development environment

set -e

echo "🏥 Welcome to Healthify Platform Setup"
echo "======================================"

# Check Node.js version
echo "📋 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check Docker
echo "📋 Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and try again."
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "✅ Docker is installed and running"

# Check Docker Compose
echo "📋 Checking Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "✅ Docker Compose is available"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting up Git hooks..."
npx husky install

# Copy environment file
echo "🌍 Setting up environment variables..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please update .env with your actual configuration values"
else
    echo "⚠️  .env file already exists, skipping..."
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs
mkdir -p uploads
mkdir -p temp

# Set permissions
chmod +x scripts/*.sh

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with actual configuration values"
echo "2. Run 'npm run dev' to start development services"
echo "3. Visit http://localhost:3000 to access the API Gateway"
echo ""
echo "For more information, see README.md"
echo "" 