#!/bin/bash

# Ensure the script stops on errors
set -e

# Check if the user provided a commit message
if [ -z "$1" ]; then
    echo "Usage: $0 'Your commit message'"
    exit 1
fi

# Commit message passed as the first argument
COMMIT_MESSAGE="$1"

# Dummy file to track changes
DUMMY_FILE="dummy.txt"

# Check if the current directory is a Git repository
if [ ! -d ".git" ]; then
    echo "No Git repository found, initializing a new one..."
    git init
fi

# Check if a remote repository exists
REMOTE_URL=$(git remote -v)

if [ -z "$REMOTE_URL" ]; then
    echo "No remote repository found. Please provide the remote URL (e.g., https://github.com/username/repo.git):"
    read -p "Remote URL: " REMOTE_URL

    # Add remote repository URL
    git remote add origin "$REMOTE_URL"
    echo "Remote repository added: $REMOTE_URL"
fi

# Ensure the dummy file exists
touch "$DUMMY_FILE"

# Loop for the past 40 days
for i in {1..40}; do
    # Calculate the date for 'i' days ago
    COMMIT_DATE=$(date -d "$i days ago" +"%Y-%m-%d 12:00:00")
    
    # Add a line to the dummy file to ensure changes
    echo "Commit for $COMMIT_DATE" >> "$DUMMY_FILE"

    # Stage changes
    git add .

    # Create the commit with the custom date
    GIT_AUTHOR_DATE="$COMMIT_DATE" GIT_COMMITTER_DATE="$COMMIT_DATE" git commit -m "$COMMIT_MESSAGE (Day -$i)"
done

# Remove the dummy file
echo "Removing $DUMMY_FILE"
rm "$DUMMY_FILE"
git add "$DUMMY_FILE"  # Stage the removal
git commit -m "Remove dummy file"

# Push the changes to the main branch
echo "Pushing to main branch..."
git push -u origin main

echo "All done!"
