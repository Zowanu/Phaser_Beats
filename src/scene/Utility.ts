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

export class Frame{
    FrameRect!:Phaser.GameObjects.Rectangle;
    CoverRect!:Phaser.GameObjects.Rectangle;

    OnAlpha:number = 1;
    OffAlpha:number = 0;

    constructor(scene: Phaser.Scene, Rect:Rectangle, Tick:number){
        let FR = new Rectangle(Rect.Pos.X-Tick, Rect.Pos.Y-Tick, Rect.Size.Width + Tick * 2, Rect.Size.Height + Tick * 2);
        let CR = new Rectangle(Rect.Pos.X, Rect.Pos.Y, Rect.Size.Width, Rect.Size.Height);
        this.FrameRect = scene.add.rectangle(FR.Pos.X, FR.Pos.Y, FR.Size.Width, FR.Size.Height, 0xFFFFFF).setOrigin(0,0);
        this.CoverRect = scene.add.rectangle(CR.Pos.X, CR.Pos.Y, CR.Size.Width, CR.Size.Height, 0x000000).setOrigin(0,0);

        this.setSelectChange(false);
        this.setDepth(0,1);
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

    setDepth(FrameDep:number,CoverDep:number){
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


export class ItemPanel{
    Image!:Phaser.GameObjects.Sprite;
    Level:number = 1;
    SubPosition = -1;
    MainPosition = -1;
    IsSelected:boolean = false;
    Owner!:Phaser.Scene;
    IsDummy:boolean = false;
    constructor(scene: Phaser.Scene, imgsprite:string, subP:number, dragendEv:Function, dummy:boolean = false){
        this.SubPosition = subP;

        this.IsDummy = dummy;
        if(this.IsDummy) return;

        let subRect = SD.SubPnl[subP];
        this.Image = scene.add.sprite(subRect.Pos.X, subRect.Pos.Y, imgsprite).setOrigin(0,0);        
        this.Image.setScale(subRect.Size.Width/this.Image.width, subRect.Size.Height/this.Image.height);
        this.Image.setInteractive({useHandCursor: true, draggable: true })
        this.Owner = scene;

        this.Image.on('drag', (_0:Phaser.Input.Pointer,pos_x:number, pos_y:number)=>{
			this.Image.setPosition(pos_x, pos_y);
            this.Image.setAlpha(0.5);
		}); 

        this.Image.on('dragend', ()=>dragendEv(this, this.Owner));
        this.setDepth(10);
        
    }   

    setPosition(Pos:Position){
        this.Image.setPosition(Pos.X, Pos.Y);
    }

    setDepth(Dep:number){
        this.Image.setDepth(Dep);
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
        this.setPosition(subRect.Pos);
        this.Image.setInteractive({useHandCursor: true, draggable: true })
    }

    setMainPChange(mainP:number){
        this.MainPosition = mainP;
        this.SubPosition = -1;
        let mainRect = SD.MainPnl3[mainP];
        this.Image.setScale(mainRect.Size.Width/this.Image.width, mainRect.Size.Height/this.Image.height);
        this.setPosition(mainRect.Pos);
        this.Image.removeInteractive();
    }

}

export class Panel_Dmy extends ItemPanel{
    constructor(scene: Phaser.Scene, subP:number, dragendEv:Function){
        super(scene,"",subP, dragendEv, true);
    }
}

export class Panel_Exp extends ItemPanel {
    constructor(scene: Phaser.Scene, subP:number, dragendEv:Function){
        super(scene,"Img_Exp1",subP, dragendEv);
    }
}

export class Panel_Atk extends ItemPanel{
    constructor(scene: Phaser.Scene, subP:number, dragendEv:Function){
        super(scene,"Img_Atk1",subP, dragendEv);
    }
}

