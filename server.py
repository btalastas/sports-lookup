#!/usr/bin/env python3
import sys
import threading
import socket

SPORTS = {1: "NBA", 2: "MLB", 3: "NFL", 4: "NHL"}

# need socket, data processing thread function.


def main():
    args = sys.argv[1:]

    if len(args) != 1:
        sys.stderr.write("Error running program.\n./server.py <port-#>")

    # creating server socket
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_address = ("127.0.0.1", int(args[0]))
    server_socket.listen()
    print("btal server starting....\n\nWaiting for connection....")


if __name__ == "__main__":
    main()
