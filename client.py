#!/usr/bin/env python3
import sys
import threading
import socket

# need socket, data processing thread function.

WELCOME_MESSAGE = "Welcome to btal sports and stats"
LINE_BREAKER = "-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-"


def main():
    args = sys.argv[1:]
    if len(args) != 2:
        sys.stderr.write("Error running program. ./client.py <port-#> <IP-Address>")
    print(f"{LINE_BREAKER}\n\n{WELCOME_MESSAGE}\n\n{LINE_BREAKER}\n\n")

    # args[0] -> port number; args[1] -> server ip address
    server_address = (int(args[0]), args[1])

    # ask user for preferences
    # sports type and save file type

    print("Which sports are you looking for?\n1. NBA\t2. MLB\n3. NFL\tNHL\n")

    sports_category = input()
    print(sports_category)


if __name__ == "__main__":
    main()
