# sports-lookup

## client / server application that implements socket and multithreading programming

### Description

* Client connects to server through TCP connection.
* The server sends a message to the client with a prompt after establishing a connection.
* The client answers the prompt sent to the receiver and sends a message back to the server.
* Server sends back dataset depending on the client's message and waits for any further requests.
* Inside of a different thread, the client receives the dataset and converts it to its preferred file format type.
* Decide to close the connection and use the downloaded dataset and convert it into a dataframe or NumPy array.
