#!/bin/bash

# Create a new tmux session named 'library_system'
tmux new-session -d -s library_system

# Split the window into three panes
tmux split-window -h
tmux split-window -v

# Run the commands in each pane
tmux send-keys -t library_system:0.0 'docker-compose up' C-m
tmux send-keys -t library_system:0.1 'npm run start:dev' C-m
tmux send-keys -t library_system:0.2 'npx prisma studio' C-m

# Attach to the tmux session
tmux attach-session -t library_system