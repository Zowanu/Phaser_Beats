import { Position,Rectangle,Size } from "./Utility";

export enum DepNo{
    Map = 0,
    Player,
    MenuBtn,
    MainWind,
    CmdWind,
    TextWind,
    Command,
}

export class SD{
    static Display:Size = new Size(400,600);
    static Center = new Position(this.Display.Width/2,this.Display.Height/2);

    static GameFontLev = new Size(2/3,2/3);
    static TurnFontSize = 30;
    static TurnWidth = 8 * this.GameFontLev.Width * this.TurnFontSize;
    static TurnHeight = 30;

    static BeetSpeed = 500;
    static BeetTurn = 4;

    static BaseMargin = 20;

    static MainSize = new Size(96,96);
    static MainTop = 200;
    static MainPnl3:Rectangle[] = 
    [
        new Rectangle(SD.Display.Width / 6 ,this.MainTop,this.MainSize.Width, this.MainSize.Height),
        new Rectangle(SD.Display.Width / 2 ,this.MainTop,this.MainSize.Width, this.MainSize.Height),
        new Rectangle(SD.Display.Width / 6 * 5 ,this.MainTop,this.MainSize.Width, this.MainSize.Height)
    ];
    static MainPnl4:Rectangle[] = [
        new Rectangle(SD.Display.Width / 8 - this.MainSize.Width/2,this.MainTop,this.MainSize.Width, this.MainSize.Height),
        new Rectangle(SD.Display.Width / 8 * 3 - this.MainSize.Width/2,this.MainTop,this.MainSize.Width, this.MainSize.Height),
        new Rectangle(SD.Display.Width / 8 * 5 - this.MainSize.Width/2,this.MainTop,this.MainSize.Width, this.MainSize.Height),
        new Rectangle(SD.Display.Width / 8 * 7 - this.MainSize.Width/2,this.MainTop,this.MainSize.Width, this.MainSize.Height),
    ];

    static SubSize = new Size(48,48);
    static SubTop = 350;
    static SubPnl:Rectangle[] = [
        new Rectangle(SD.Display.Width / 10 ,this.SubTop,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 3 ,this.SubTop,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 5 ,this.SubTop,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 7 ,this.SubTop,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 9 ,this.SubTop,this.SubSize.Width, this.SubSize.Height),

        new Rectangle(SD.Display.Width / 10 ,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 3 ,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 5 ,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 7 ,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 9 ,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        /*
        new Rectangle(SD.Display.Width / 10 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 3 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 5 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 7 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 9 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        */
    ]

    static Stat_Top = 500;
    static Stat_Fontsize = 24;
    static Stat_Txt:Position[] = [
        new Position(SD.BaseMargin, this.Stat_Top),
        new Position(SD.BaseMargin, this.Stat_Top + (this.Stat_Fontsize * this.GameFontLev.Height + 10) * 1),
        new Position(SD.BaseMargin, this.Stat_Top + (this.Stat_Fontsize * this.GameFontLev.Height + 10) * 2),
    ]

    static MainFrmDep = 10;
    static MainPnlDep = 20;
    static SubFrmDep = 10;
    static SubPnlDep = 20;

}

export class SDST{
    static MLText ="ステータス ヲ フッテ クダサイ";
    static MLFontSize = 24;
    static MLWidth = this.MLText.length * this.MLFontSize * SD.GameFontLev.Width;
    static MLTop = 30;
    static MainLabel:Position = new Position(SD.Center.X - this.MLWidth / 2, this.MLTop);

    static RmText ="ノコリ 0";
    static RmFontSize = 50;
    static RmWidth = this.RmText.length * this.RmFontSize * SD.GameFontLev.Width;
    static RmTop = 100;
    static RemainLabel:Position = new Position(SD.Center.X - this.RmWidth / 2, this.RmTop)

    static STTop = 200;
    static STSize:Size = new Size(160,40);
    static STLeft = SD.Center.X/2 - this.STSize.Width/2;
    static STRight= SD.Center.X + this.STLeft; 
    static STMargin = 30;
    static STRect:Rectangle[] = [
        new Rectangle(this.STLeft, this.STTop, this.STSize.Width, this.STSize.Height),
        new Rectangle(this.STRight, this.STTop, this.STSize.Width, this.STSize.Height),
        new Rectangle(this.STLeft, this.STTop + this.STSize.Height + this.STMargin, this.STSize.Width, this.STSize.Height),
        new Rectangle(this.STRight, this.STTop + this.STSize.Height + this.STMargin, this.STSize.Width, this.STSize.Height),
    ]

    static BuOKRect:Rectangle = new Rectangle(SD.Center.X, 400,200,50);
    static BuOKLabel = "OK";
    static BuOKFontsize = 40;
 
}

