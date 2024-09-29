#!/bin/bash
echo "Navigating to API folder, activating virtual environment, installing dependencies, and running summary.py..."
cd API || exit

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

echo "All commands executed successfully!"

# Keep the dashboard server running by waiting for the process to end
wait $dashboard_pid