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

# Step 4: Navigate to API folder, activate virtual environment, install dependencies, and run the Python script
echo "Navigating to API folder, activating virtual environment, installing dependencies, and running summary.py..."
cd ../API || exit

# Step 4.1: Create and activate virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv venv
fi

# Step 4.2: Activate the virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Step 4.3: Install required Python packages
pip install -r requirements.txt

# Step 4.4: Run the Python script
python summary.py

# Step 5: Bring back to root directory
cd ..

# Step 6: Inform the user about the status
echo "All commands executed successfully!"

# Keep the dashboard server running by waiting for the process to end
wait $dashboard_pid
