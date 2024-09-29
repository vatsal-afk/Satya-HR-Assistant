#!/bin/bash

# Step 1: Navigate to dashboard and run npm dev
echo "Navigating to dashboard and starting the development server..."
cd dashboard || exit
npm run dev &
# Store the PID of the dashboard process
dashboard_pid=$!

# Step 2: Wait a few seconds to ensure dashboard starts properly
sleep 5

# Step 3: Navigate to data folder and run the node script
echo "Navigating to data folder and executing addApplicant.js..."
cd ../data || exit
node addApplicant.js

# Step 4: Navigate to API folder, install dependencies, and run the Python script
echo "Navigating to API folder, installing Python dependencies, and running summary.py..."
cd ../API || exit
pip install -r requirements.txt
python summary.py

# Step 5: Bring back to root directory
cd ..

# Step 6: Inform the user about the status
echo "All commands executed successfully!"

# Keep the dashboard server running by waiting for the process to end
wait $dashboard_pid
