# sports-lookup

## ***Description***

Request and download various sport datasets from the server host.

* Client connects to server through TCP connection.
* The server sends a message to the client with a prompt after establishing a connection.
* The client answers the prompt sent to the receiver and sends a message back to the server.
* Server sends back dataset depending on the client's message and waits for any further requests.
* Inside of a different thread, the client receives the dataset and converts it to its preferred file format type.
* Decide to close the connection and use the downloaded dataset and convert it into a dataframe or NumPy array.

## ***Functionalities***

* Download a file from server host through a persistent connection.
* Save file within the directory as a JSON or CSV.
* Perform search and sort

## ***Getting started***

### *Installing*

Navigate to a directory and run the command.

```sh
git clone https://github.com/btalastas/sports-lookup.git
```

### *Executing Program*

* Work in progress

### *Dependencies*

* Python 3.x

## Authors

Bjorn Talastas [email] (<btalasta@gmu.edu>)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

