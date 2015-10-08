const app    = require('express')();
const body   = require('body-parser');
const server = require('http').Server(app);
const io     = require('socket.io')(server);

server.listen(8001);

const buffer = require('stream-buffers');
const docker = require('dockerode')({ socketPath: '/var/run/docker.sock', timeout: 5000 });
const util   = require('util');

const compilers = {
  cpp        : 'a.cpp && g++ -o a.out a.cpp && ./a.out',
  go         : 'a.go && go run a.go',
  java       : 'Solution.java && javac Solution.java && java Solution',
  javascript : 'a.js && nodejs a.js',
  php        : 'a.php && php a.php',
  python     : 'a.py && python a.py',
  python3    : 'a.py && python3 a.py',
  ruby       : 'a.rb && ruby a.rb',
};

app.use(body.json());

app.post('/', (req, res) => {
  const code  = req.body.code;
  const lang  = req.body.lang;
  const input = req.body.input;

  if (typeof(code) !== 'string' ||
      typeof(lang) !== 'string' ||
      typeof(input) !== 'string' ||
      !(lang in compilers)) {
    return res.sendStatus(400);
  }

  const executor = compilers[lang];
  const rawcode  = util.inspect(code);
  const rawinput = util.inspect(input);
  const output   = new buffer.WritableStreamBuffer();

  const script = `printf ${rawinput} > a.in && printf ${rawcode} > ${executor} < a.in`;
  docker.run('hiphooker', ['bash', '-c', script], output, function (error, data) {
    if (error) {
       res.json({
         status: 'T',
       });
    } else {
       res.json({
         status: data['StatusCode'] === 0 ? 'O' : 'X',
         result: output.getContentsAsString('utf8'),
       });
    }
  });
});
