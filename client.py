#!/usr/bin/env python3
import sys
import threading
import socket

# need socket, data processing thread function.


def main():
    args = sys.argv[1:]
    if len(args) != 2:
        sys.stderr.write("Error running program. ./client.py <port-#> <IP-Address>")

    # args[0] -> port number; args[1] -> server ip address
    server_address = (int(args[0]), args[1])
    print(f"server address: {server_address}")

    # ask user for preferences
    # sports type and save file type

    print("Which sports are you looking for?" "1. NBA\t2. MLB\n3. NFL\tNHL\n")


if __name__ == "__main__":
    main()
