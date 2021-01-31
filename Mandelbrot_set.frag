//Mandelbrot_set
#define MAX_ITERATIONS 1024.
#define SCALE_SPEED 1.
#define ITERATIONS_CHANGE_SPEED 1.

#define POS_X -0.5625
#define POS_Y 0.64335

#define M_PI 3.1415



vec3 brightness_to_rgb(float x){
    /*color[0]=(sin(3*M_PI*x+7)+1.f)*127.f;
    color[1]=(sin(4*M_PI*x+M_PI_4+2)+1.f)*127.f;
    color[2]=(sin(5*M_PI*x+M_PI_2+3)+1.f)*127.f;*/
    
    //k=4; a1=0.55; a2=0.45; a3=0.35;
    float k, a1, a2, a3;
    vec3 color;
    
    x=sqrt(x);

    k=4.; a1=0.55; a2=0.45; a3=0.35;
    //k=4.; a1=0.3; a2=0.5; a3=0.7;
    color.r=exp(-pow(k*(x-a1),2.));
    color.g=exp(-pow(k*(x-a2),2.));
    color.b=exp(-pow(k*(x-a3),2.));
    return color;
}

float get_mandelbrot_brightness(float x0, float y0, int max_iterations){
	int k=0;
    float x=0., y=0., xtemp=0.;

    
        
	while((x*x + y*y <= 4.) && (k<max_iterations)){
    	xtemp = x*x - y*y + x0;
        y = 2.*x*y + y0;
        x = xtemp;
        k+=1;
    }
    return float(k)/float(max_iterations);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    //vec2 uv = fragCoord/iResolution.xy;
    
    int max_iterations = int((cos(ITERATIONS_CHANGE_SPEED*iTime + M_PI)*0.4+0.6)*MAX_ITERATIONS);
    float scale = 4./max(float(iResolution.x), float(iResolution.y))*(cos(SCALE_SPEED*iTime)*0.5+0.505);
    vec2 uv;
    uv.x = (fragCoord.x - float(iResolution.x/2.))*scale+POS_X;
	uv.y = (fragCoord.y - float(iResolution.y/2.))*scale+POS_Y;

  
    // Time varying pixel color
    //vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    vec3 col = brightness_to_rgb(get_mandelbrot_brightness(uv.x, uv.y, max_iterations));
    
    fragColor = vec4(col,1.0);
}