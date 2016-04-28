var TextureTests = require(__base + 'js/tests/texturetests');

var tests = new TextureTests();
// tests.simpleLayerTest();

var filepaths = [];
filepaths.push(__base + 'index.html');
filepaths.push(__base + 'js/textplane/textplane.js');
filepaths.push(__base + 'js/textplane/textplanelayer.js');
filepaths.push(__base + 'js/textplane/texttexture.js');
filepaths.push(__base + 'js/app.js');
filepaths.push(__base + 'js/OrbitControls.js');

tests.loadCodeFromFilesystemTest(filepaths);