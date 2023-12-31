#!/usr/bin/env python3
import sys
import threading
import socket


# need socket, data processing thread function.

WELCOME_MESSAGE = "Welcome to btal sports and stats"
LINE_BREAKER = "-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-"

FILE_FORMAT = {1: "CSV", 2: "JSON"}
SPORTS = {1: "NBA", 2: "MLB", 3: "NFL", 4: "NHL"}


def sports_prompt():
    while True:
        print("Which sports are you looking for?\n1. NBA\t2. MLB\n3. NFL\tNHL\n")

        sports_category = input()
        if (
            not sports_category.isdigit()
            or int(sports_category) < 0
            or int(sports_category) > 4
        ):
            print("Enter valid number.")
            continue
        sport = SPORTS.get(int(sports_category))
        if sport is not None:
            break
        else:
            print("Enter valid number.")


def file_prompt():
    while True:
        print("What file format do you want the data to be saved in?\n1. JSON\t2. CSV")
        file_format = input()

        if not file_format.isdigit() or int(file_format) < 0 or int(file_format) > 2:
            print("Enter valid number.")
            continue
        file_type = FILE_FORMAT.get(int(file_format))

        if file_type is not None:
            break
        else:
            print("Enter valid number.")


def main():
    args = sys.argv[1:]
    if len(args) != 2:
        sys.stderr.write("Error running program. ./client.py <IP-Address> <port-#>")
    print(f"{LINE_BREAKER}\n\n{WELCOME_MESSAGE}\n\n{LINE_BREAKER}\n\n")

    # args[0] -> server ip address  args[1] -> port number
    server_address = (args[0], int(args[1]))
    # ask user for preferences
    # sports type and save file type
    sports_prompt()
    file_prompt()

    # create socket
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


if __name__ == "__main__":
    main()
