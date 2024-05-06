import subprocess


class RedisProtocol:
    def __init__(self):
        self.protocol = ""
        self.length = 0

    def add_to_protocol(self, *command):
        proto = ""
        proto = f"*{len(command)}\r\n"

        for cmd in command:
            proto += f"${bytesize(cmd)}\r\n{cmd}\r\n"

        self.protocol += proto

    def run_protocol(self):
        command = 'redis-cli --pipe'
        process = subprocess.Popen(command, stdin=subprocess.PIPE, shell=True)
        process.communicate(self.protocol.encode())

def bytesize(string: str):
    return len(string.encode('utf-8'))
