#!/bin/bash

# Step 1: Navigate to dashboard and run npm dev
echo "Navigating to dashboard and starting the development server..."
cd dashboard || exit
npm run dev &
# Store the PID of the dashboard process
dashboard_pid=$!

# Step 2: Wait a few seconds to ensure dashboard starts properly




# Step 4: Navigate to API folder, activate virtual environment, install dependencies, and run the Python script


# Step 6: Inform the user about the status

