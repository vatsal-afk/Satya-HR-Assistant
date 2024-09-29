import pandas as pd
import matplotlib.pyplot as plt
import os

# Sample data (corrected structure)
data = {
    "ID": 797,
    "Number_of_Jobs": 3,
    "Number_of_Adjectives": 302,
    "Number_of_Degrees": 1,
    "Number_of_Certificates": 0,
    "Years_of_Experience": 29,
    "Soft_skill_count": 6,  # Fixed key to be consistent
    "Technical_skill_count": 3,
    "Weighted_Score": 54.44,
    "Risk_Category": "Maybe Risky"
}


# Wrap the dictionary in a list to create a DataFrame
df = pd.DataFrame([data])

# Isolate the columns to be used (excluding first column and last two columns)
columns_to_plot = df.columns[1:-2]

# Create output directory one level above current directory
output_dir = os.path.join(os.path.dirname(os.getcwd()), 'generated-graphs')
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Loop through each row and plot a separate graph
for i, row in df.iterrows():
    # Create a figure for each row
    plt.figure(figsize=(10, 5))
    
    # Plot each column's value as a horizontal line for the row
    for j, col in enumerate(columns_to_plot):
        # Plot a horizontal line from (0, j) to (row[col], j)
        plt.hlines(y=j, xmin=0, xmax=row[col], color='blue', linewidth=10, label=col if j == 0 else "")
    
    # Customize the plot
    plt.yticks(range(len(columns_to_plot)), columns_to_plot)  # Set y-ticks to column names
    plt.xlim(0, 100)  # Set x-axis range from 0 to 100
    plt.xlabel("Value (0-100)")
    plt.ylabel("Columns")
    plt.title(f"Values for Row {row['ID']}")
    plt.grid(True, axis='x')  # Enable grid only on the x-axis for better readability

    # Adjust layout to prevent clipping
    plt.tight_layout()
    
    # Save the figure to a file
    filename = f"{row['ID']}_plot.png"
    filepath = os.path.join(output_dir, filename)
    plt.savefig(filepath)
    
    # Close the plot to free memory after saving
    plt.close()

print(f"Plots saved in {output_dir}")
