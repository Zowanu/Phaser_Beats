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
    static Display:Size = new Size(400,800);
    static Center = new Position(this.Display.Width/2,this.Display.Height/2);

    static GameFontLev = new Size(2/3,2/3);
    static TurnFontSize = 30;
    static TurnWidth = 8 * this.GameFontLev.Width * this.TurnFontSize;
    static TurnHeight = 30;

    static BeetSpeed = 500;
    static BeetTurn = 4;

    static BaseMargin = 40;

    static MainSize = new Size(96,96);
    static MainTop = 200;
    static MainPnl3:Rectangle[] = 
    [
        new Rectangle(SD.Display.Width / 6 - this.MainSize.Width/2,this.MainTop,this.MainSize.Width, this.MainSize.Height),
        new Rectangle(SD.Display.Width / 2 - this.MainSize.Width/2,this.MainTop,this.MainSize.Width, this.MainSize.Height),
        new Rectangle(SD.Display.Width / 6 * 5 - this.MainSize.Width/2,this.MainTop,this.MainSize.Width, this.MainSize.Height)
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
        new Rectangle(SD.Display.Width / 10 - this.SubSize.Width/2,this.SubTop,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 3 - this.SubSize.Width/2,this.SubTop,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 5 - this.SubSize.Width/2,this.SubTop,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 7 - this.SubSize.Width/2,this.SubTop,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 9 - this.SubSize.Width/2,this.SubTop,this.SubSize.Width, this.SubSize.Height),

        new Rectangle(SD.Display.Width / 10 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 3 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 5 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 7 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 9 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 1,this.SubSize.Width, this.SubSize.Height),
        /*
        new Rectangle(SD.Display.Width / 10 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 3 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 5 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 7 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        new Rectangle(SD.Display.Width / 10 * 9 - this.SubSize.Width/2,this.SubTop + (this.SubSize.Height + this.BaseMargin ) * 2,this.SubSize.Width, this.SubSize.Height),
        */
    ]


}

