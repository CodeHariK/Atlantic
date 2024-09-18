#!/bin/bash

# Define ANSI colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
REDBG='\033[45;5;135m'
NC='\033[0m' # No Color

# Define HTML color styles
HTML_RED='<p style="color: #ed7575;">'
HTML_GREEN='<p style="color: #9ef69e;">'
HTML_YELLOW='<p style="color: #f7f788;">'
HTML_BLUE='<p style="color: #9393ed;">'
HTML_PURPLE='<p style="color: #ca63c2;">'
HTML_NC='</p>' # No Color

# Function to run a command and print its output in a specific format and color
run_command() {
    name="$1"
    cmd="$2"
    color="$3"
    html_color="$4"
    logfile="$5"

    bash -c "$cmd" 2>&1 | while IFS= read -r line; do
        # Print to console with ANSI color
        echo -e "${color}[$name] $line${NC}"

        # Append to the specified logfile with HTML color
        echo "${html_color}[$name] $line${HTML_NC}" >> "$logfile"
    done
}

# Array of colors
colors=("$RED" "$GREEN" "$REDBG" "$YELLOW" "$BLUE")
html_colors=("$HTML_RED" "$HTML_GREEN" "$HTML_YELLOW" "$HTML_BLUE" "$HTML_PURPLE")

# Check if the number of arguments is even (name-command pairs)
if (( $# % 2 != 0 )); then
    echo "Error: Please provide an even number of arguments (name-command pairs)."
    exit 1
fi

# Specify the logfile
logfile="logfile.html"

# Start the HTML logfile with the header
echo "<html><head><style>body {background: #262626; font-family: monospace;} p {padding: 0px;margin: 0px;}</style><script>setTimeout(function () {window.location.reload();}, 5000);</script></head><body>" > "$logfile"

# Loop through arguments two at a time: name and command
index=0
while (( "$#" )); do
    name="$1"
    cmd="$2"

    # Select a color from the colors array
    color="${colors[$((index % ${#colors[@]}))]}"
    html_color="${html_colors[$((index % ${#html_colors[@]}))]}"

    # Run the command in the background
    run_command "$name" "$cmd" "$color" "$html_color" "$logfile" &

    # Shift to the next pair of name and command
    shift 2
    ((index++))
done

# Wait for all background processes to complete
wait

# End the HTML logfile with the footer
echo "</body></html>" >> "$logfile"
NC='\033[0m' # No Color

# Function to run a command and print its output in a specific format and color
run_command() {
    name="$1"
    cmd="$2"
    color="$3"
    logfile="$4"

    bash -c "$cmd" 2>&1 | while IFS= read -r line; do
        # Print to console with color
        echo -e "${color}[$name] $line${NC}"
        # Append to the specified logfile without color
        echo "[$name] $line" >> "$logfile"
    done
}

# Array of colors
colors=("$RED" "$GREEN" "$YELLOW" "$BLUE")

# Check if the number of arguments is even (name-command pairs)
if (( $# % 2 != 0 )); then
    echo "Error: Please provide an even number of arguments (name-command pairs)."
    exit 1
fi

# Specify the logfile
logfile="logfile.txt"

# Empty the logfile at the start
> "$logfile"

# Loop through arguments two at a time: name and command
index=0
while (( "$#" )); do
    name="$1"
    cmd="$2"

    # Select a color from the colors array
    color="${colors[$((index % ${#colors[@]}))]}"

    # Run the command in the background
    run_command "$name" "$cmd" "$color" "$logfile" &

    # Shift to the next pair of name and command
    shift 2
    ((index++))
done

# Wait for all background processes to complete
wait
