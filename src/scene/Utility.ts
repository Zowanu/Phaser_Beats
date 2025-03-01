import * as Phaser from "phaser"
import { SD } from "./Static";

export class Position {
    X:number = 0;
    Y:number = 0;
    constructor (x:number, y:number){
        this.X = x;
        this.Y = y;
    }

    set(Pos:Position){
        this.X = Pos.X;
        this.Y = Pos.Y;
    }
    
    add(Pos:Position){
        this.X += Pos.X;
        this.Y += Pos.Y;
    }

    sub(Pos:Position){
        this.X -= Pos.X;
        this.Y -= Pos.Y;
    }

    isEqual(Pos:Position):boolean{
        return this.X === Pos.X && this.Y === Pos.Y;
    }

}

export class Size{
    Width:number = 0;
    Height:number = 0;
    constructor(w:number,h:number){
        this.Width = w;
        this.Height = h;
    }
}

export class Rectangle{
    Pos:Position = new Position(0,0);
    Size:Size = new Size(10,10);
    constructor(x:number,y:number,w:number,h:number){
        this.Pos = new Position(x,y);
        this.Size = new Size(w,h);
    }
}

export class Frame extends Phaser.GameObjects.Container{
    FrameRect!:Phaser.GameObjects.Rectangle;
    CoverRect!:Phaser.GameObjects.Rectangle;

    OnAlpha:number = 1;
    OffAlpha:number = 0;

    constructor(scene: Phaser.Scene, Rect:Rectangle, Tick:number){
        super(scene, Rect.Pos.X, Rect.Pos.Y);
        this.scene.add.existing(this);
        

        let FR = new Rectangle(0, 0, Rect.Size.Width + Tick * 2, Rect.Size.Height + Tick * 2);
        let CR = new Rectangle(0, 0, Rect.Size.Width, Rect.Size.Height);
        this.FrameRect = scene.add.rectangle(FR.Pos.X, FR.Pos.Y, FR.Size.Width, FR.Size.Height, 0xFFFFFF);//.setOrigin(0,0);
        this.CoverRect = scene.add.rectangle(CR.Pos.X, CR.Pos.Y, CR.Size.Width, CR.Size.Height, 0x000000);//.setOrigin(0,0);

        this.setSelectChange(false);
        this.setDepthFrame(0,1);

        this.add([this.FrameRect,this.CoverRect]);
    }

    setSelectChange(IsSelect:boolean){
        if(IsSelect)
            this.FrameRect.setAlpha(this.OnAlpha);
        else
            this.FrameRect.setAlpha(this.OffAlpha);
    }

    setColor(Color:number){
        this.FrameRect.setFillStyle(Color);
    }

    setDepthFrame(FrameDep:number,CoverDep:number){
        this.FrameRect.setDepth(FrameDep);
        this.CoverRect.setDepth(CoverDep);
    }

    setOnOffAlpha(On:number,Off:number){
        this.OnAlpha = On;
        this.OffAlpha = Off;
    }
}

export class SceneChangeTile{
    EventPos:Position = new Position(0,0);
    DestPos:Position = new Position(0,0);
    Mapname:string ="";
    constructor(pos:Position, dest:Position, mapname:string){
        this.EventPos.X = pos.X;
        this.EventPos.Y = pos.Y;
        this.DestPos.X = dest.X;
        this.DestPos.Y = dest.Y;
        this.Mapname = mapname;
    }
}

export const Method = {

    ListText(scene: Phaser.Scene, pos:Position, texts:string[], cntn:Phaser.GameObjects.Container, 
        {fontSize=20,margin=20, fontFamily= "Roboto", color="Black"}={}) {
        let PosY = pos.Y;
        texts.forEach(element => {
            var tx = scene.add.text(pos.X, PosY, element,{
                fontSize:fontSize,
                fontFamily:fontFamily
            })
            .setPadding(0,2,0,0)
            .setColor(color);
            PosY+=margin;
            cntn.add(tx);
        });
    }
}

export class ImgBtn {
    img:Phaser.GameObjects.Sprite;
    constructor(scene: Phaser.Scene, Rect:Rectangle, origin:Position,onClick:Function,imgsprite:string, btnOff:string, btnOn:string){
        
        this.img = scene.add.sprite(Rect.Pos.X, Rect.Pos.Y, imgsprite).setOrigin(origin.X,origin.Y);        
        this.img.setScale(Rect.Size.Width/this.img.width, Rect.Size.Height/this.img.height);
        this.img.setInteractive({useHandCursor: true})
        this.img.anims.play(btnOff);

        this.img.on('pointerover', () => {
            this.img.anims.play(btnOn);
        })
        this.img.on('pointerout', () => {
            this.img.anims.play(btnOff);
        })
        this.img.on('pointerup', (p:any) => {
            onClick && onClick(p);
        })

    } 

    setVisible(enab:boolean){
        this.img.setVisible(enab);
    }

    setDepth(depth:number){
        this.img.setDepth(depth);
    }
}

export class Button extends Phaser.GameObjects.Container{
    constructor(scene:Phaser.Scene, Rect:Rectangle, tick:number, dep:number, fontsize:number, label:string, clickEv:Function){
        super(scene, Rect.Pos.X, Rect.Pos.Y);
        this.scene.add.existing(this);

        let RM = scene.add.rectangle(0,0,Rect.Size.Width+tick*2,Rect.Size.Height+tick*2,0xFFFFFF).setDepth(dep++);
        let RS = scene.add.rectangle(0,0,Rect.Size.Width,Rect.Size.Height,0x000000).setDepth(dep++).setInteractive({useHandCursor: true});
        //let Labelwidth = label.length * fontsize * SD.GameFontLev.Width;
        let Labelheight = fontsize * SD.GameFontLev.Height; 
        let Tx = scene.add.text(0, Rect.Size.Height/2-Labelheight, label, 
            {fontSize:fontsize, fontFamily:"GameFont", color:"White"}).setOrigin(0.5,0.5);
        
        RS.on("pointerdown",()=>{
            if(clickEv != null)
                clickEv(scene);
        })

        this.add([RM,RS,Tx]);

    }
}

export class SpinBox extends Phaser.GameObjects.Container{

    Value:number = 0;
    ValueMax:number = 10;
    ValueMin:number = 0;
    Tx_Value!:Phaser.GameObjects.Text;
    Tx_Label!:Phaser.GameObjects.Text
    Img_Up!:Phaser.GameObjects.Image;
    Img_Do!:Phaser.GameObjects.Image;
    
    
    BaseRect!:Rectangle;
    constructor(scene:Phaser.Scene,Rect:Rectangle, tick:number, dep:number, label:string, valuechangeEv:Function,
        value:number=0, max:number = 100, min:number = 0){
        super(scene, Rect.Pos.X, Rect.Pos.Y)
		this.scene.add.existing(this);

        this.BaseRect = Rect;
        this.ValueMax = max;
        this.ValueMin = min;
        this.Value = value;

        let RM = scene.add.rectangle(-tick,-tick,Rect.Size.Width+tick*2,Rect.Size.Height+tick*2,0xFFFFFF).setOrigin(0,0).setDepth(dep++);
        let RS = scene.add.rectangle(0,0,Rect.Size.Width,Rect.Size.Height,0x000000).setOrigin(0,0).setDepth(dep++);
        
        let LFS = this.BaseRect.Size.Height*SD.GameFontLev.Height * 0.8;
        this.Tx_Label = scene.add.text(0, -LFS-this.BaseRect.Size.Height/10, label, {fontSize:LFS, fontFamily:"GameFont", color:"White"} );

        let FS = this.BaseRect.Size.Height * SD.GameFontLev.Height;
        this.Tx_Value = scene.add.text(0,0, this.Value.toString(), {fontSize:FS, fontFamily:"GameFont", color:"White"});
        this.TxValueChange();

        this.Img_Up = scene.add.image(Rect.Size.Width / 4 * 2, 0, "Img_SpinUP").setOrigin(0,0).setInteractive({useHandCursor: true}).setDepth(dep++);
        this.Img_Do = scene.add.image(Rect.Size.Width / 4 * 3, 0, "Img_SpinDO").setOrigin(0,0).setInteractive({useHandCursor: true}).setDepth(dep++);
        let ImgLev = Rect.Size.Width/4/this.Img_Up.width;
        this.Img_Up.setScale(ImgLev, ImgLev);
        this.Img_Do.setScale(ImgLev, ImgLev);

        this.add([
            RM,RS,this.Tx_Label,this.Tx_Value,this.Img_Up,this.Img_Do
        ])

        this.Img_Up.on("pointerdown",()=>{
            if(this.Value<this.ValueMax)
            this.Value++;
            this.TxValueChange();
            if(valuechangeEv != null)
                valuechangeEv(scene);
        });

        this.Img_Do.on("pointerdown",()=>{
            if(this.Value>this.ValueMin){
                this.Value--;  
                this.TxValueChange();
                if(valuechangeEv != null)
                    valuechangeEv(scene);
            }
        })
    }

    TxValueChange(){
        let FS = this.BaseRect.Size.Height * SD.GameFontLev.Height;
        let FX = this.BaseRect.Size.Width/2 - this.Value.toString().length * FS * SD.GameFontLev.Width - this.BaseRect.Size.Height / 6;
        
        this.Tx_Value.setText(this.Value.toString());
        this.Tx_Value.setPosition(FX,FS/6);
    }

}


export class ItemPanel extends Phaser.GameObjects.Container{
    Type:string = "";
    Image!:Phaser.GameObjects.Sprite;
    Level:number = 1;
    SubPosition = -1;
    MainPosition = -1;
    IsSelected:boolean = false;
    Owner!:Phaser.Scene;
    IsDummy:boolean = false;
    constructor(scene: Phaser.Scene, imgsprite:string, subP:number, dragendEv:Function, type:string, dep:number, dummy:boolean = false){
        super(scene, SD.SubPnl[subP].Pos.X, SD.SubPnl[subP].Pos.Y);
		this.scene.add.existing(this);

        this.Type = type;
        this.SubPosition = subP;
        
        this.IsDummy = dummy;
        if(this.IsDummy) return;

        let subRect = SD.SubPnl[subP];
        this.Image = scene.add.sprite(0,0, imgsprite);//.setOrigin(0,0);        
        this.Image.setScale(subRect.Size.Width/this.Image.width, subRect.Size.Height/this.Image.height);
        //this.Image.setInteractive({useHandCursor: true, draggable: true })
        this.Owner = scene;

        this.setSize(subRect.Size.Width, subRect.Size.Height);
        
        this.setInteractive({useHandCursor: true, draggable: true});
        this.on('drag',(_0:Phaser.Input.Pointer,pos_x:number, pos_y:number)=>{
			this.setPosition(pos_x, pos_y);
            this.setAlpha(0.5);
		}); 

        this.on('dragend', ()=>dragendEv(this, this.Owner));
        

        /*
        this.Image.on('drag', (_0:Phaser.Input.Pointer,pos_x:number, pos_y:number)=>{
			this.setPosition(pos_x - this.x, pos_y - this.y);
            this.Image.setAlpha(0.5);
		}); 

        this.Image.on('dragend', ()=>dragendEv(this, this.Owner));
        */

        this.Image.setDepth(dep);

        this.add(this.Image);
        
    }   


    setSelectChange(IsSelect:boolean){
        this.IsSelected = IsSelect;
        if(this.IsSelected)
            this.Image.setScale(SD.MainSize.Width/this.Image.width, SD.MainSize.Height/this.Image.height);
        else
            this.Image.setScale(SD.SubSize.Width/this.Image.width, SD.SubSize.Height/this.Image.height);
    }

    setSubPChange(subP:number){
        this.SubPosition = subP;
        this.MainPosition = -1;
        let subRect = SD.SubPnl[subP];
        this.Image.setScale(subRect.Size.Width/this.Image.width, subRect.Size.Height/this.Image.height);
        this.setPosition(subRect.Pos.X, subRect.Pos.Y);
        this.setInteractive({useHandCursor: true, draggable: true })
    }

    setMainPChange(mainP:number){
        this.MainPosition = mainP;
        this.SubPosition = -1;
        let mainRect = SD.MainPnl3[mainP];
        this.Image.setScale(mainRect.Size.Width/this.Image.width, mainRect.Size.Height/this.Image.height);
        this.setPosition(mainRect.Pos.X, mainRect.Pos.Y);
        this.removeInteractive();
    }

}

export class Panel_Dmy extends ItemPanel{
    constructor(scene: Phaser.Scene, subP:number, dep:number, dragendEv:Function){
        super(scene,"",subP, dragendEv,"Panel_Dmy",dep, true);
    }
}

export class Panel_Exp extends ItemPanel {
    constructor(scene: Phaser.Scene, subP:number, dep:number, dragendEv:Function){
        super(scene,"Img_Exp1",subP, dragendEv,"Panel_Exp", dep);
    }
}

export class Panel_Atk extends ItemPanel{
    constructor(scene: Phaser.Scene, subP:number, dep:number, dragendEv:Function){
        super(scene,"Img_Atk1",subP, dragendEv,"Panel_Exp", dep);
    }
}

export class Panel_Def extends ItemPanel{
    constructor(scene: Phaser.Scene, subP:number, dep:number, dragendEv:Function){
        super(scene,"Img_Atk1",subP, dragendEv,"Panel_Exp",dep);
    }
}

export class Panel_Get extends ItemPanel{
    constructor(scene: Phaser.Scene, subP:number, dep:number, dragendEv:Function){
        super(scene,"Img_Atk1",subP, dragendEv,"Panel_Get",dep);
    }
}

