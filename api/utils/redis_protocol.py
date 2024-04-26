class RedisProtocol:
    def __init__(self):
        self.protocol = ""
        self.length = 0

    def create_protocol(self, *command):
        proto = ""
        proto = fr"*{len(command)}\r\n"

        for cmd in command:
            proto += fr"${bytesize(cmd)}\r\n{cmd}\r\n"

        print(f"proto : {proto}")
        self.protocol += proto

    def generate_protocol_file(self):
        print("arquivo")
        with open("protocol.txt", "w") as proto_file:
            print('escrevendo')
            proto_file.write(rf"{self.protocol}")


def bytesize(string: str):
    return len(string.encode('utf-8'))