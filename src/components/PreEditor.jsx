import React, { Component } from 'react';

class PreEditor extends Component {
    onImgLoad () {
        var img = new Image();
        img.src = this.props.fileUrl;

        var canvas = document.getElementById('PreEditorCanvas');

        var ctx = canvas.getContext('2d');
        
        

        img.onload = () => {
            let proportion = img.height/img.width;
            canvas.width = 400;
            canvas.height = canvas.width*proportion;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var w = canvas.width;
            var h = canvas.height;
            ctx.drawImage(img, 0, 0, w, h);

            /* Make transparent pixels white */
            let imgc = ctx.getImageData(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < imgc.data.length; i += 4) {
                if (imgc.data[i+3] === 0) {
                    imgc.data[i] = 255;
                    imgc.data[i+1] = 255;
                    imgc.data[i+2] = 255;
                    imgc.data[i+3] = 255;
                } else {
                    imgc.data[i+3] = 255;
                }
            }

            ctx.putImageData(imgc, 0, 0)

            this.props.outputHandler({"preEditUrl" : canvas.toDataURL(),
                                    "width" : canvas.width,
                                    "proportion" : proportion});
        }


    }

    componentDidUpdate(prevProps) {
        if(this.props.fileUrl !== prevProps.fileUrl)
        {   
            this.onImgLoad()
        }
    }

    render() {
        return (
            <div>
                <canvas id="PreEditorCanvas"></canvas>    
            </div>
        );
    }
}

export default PreEditor;