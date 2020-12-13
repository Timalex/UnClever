var vertexShaderSource = `#version 300 es
 
#pragma vscode_glsllint_stage : vert
in vec4 a_position;
 
void main() {
 
  gl_Position = a_position;
}
`;
 
var fragmentShaderSource = `#version 300 es
 
#pragma vscode_glsllint_stage : frag
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  // Just set the output to a constant reddish-purple
  outColor = vec4(1, 0, 0.5, 1);
}
`;