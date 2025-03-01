import Phaser from "phaser";
import { SD } from "./Static.ts";

export class LoadingScene extends Phaser.Scene {
    //#region 変数

    constructor() {
		// シーンのkeyを指定
		super('loading');
    }

    preload() {
		this.load.setBaseURL('/src/');  //開発時のみONにする　ビルド時にはコメントアウトする

		// ロゴ画像だけは最初から表示したいので予めロード
		this.load.image('Img_BG02', 'assets/BG001.png');
		this.load.spritesheet('Img_Logo', 'assets/Logo02.svg',{frameWidth:300,frameHeight:300});
    }

    create() {
		//ロゴ用のアニメーションを先に設定
		this.animSetting(true);

		// アセットをロード（一度ロードしたアセットは他のシーンでも使用可）
		this.assetsLoad();

		//背景表示
		this.add.image(SD.Center.X, SD.Center.Y, "Img_BG02");
		// ロゴ画像を中央に表示
		this.add.sprite(SD.Center.X, SD.Center.Y, "Img_Logo").anims.play("Anm_LogoStart");

		// アセットのロードが完了したらTitleSceneに遷移      
		this.load.on('complete', () => {      
			//アニメーションの設定
			this.animSetting(false);

			//1秒待ってタイトルシーンに移動
			this.time.delayedCall(1, ()=>  
			{  
			//シーン切替
			this.scene.start('MainScene')
			},[], this);      
      	});
      
      
		// アセットのロードを開始（preload外でロードを行う場合はこのメソッドを呼ぶ必要がある）
		this.load.start();
    }

    private assetsLoad(){
		this.load.image('Img_Exp1', 'assets/Exp.png');
		this.load.image('Img_Atk1', 'assets/Atk.png');

		this.load.image("Img_SpinUP", 'assets/Spin_UP.png');
		this.load.image("Img_SpinDO", 'assets/Spin_DO.png');
    }

    private animSetting(pre:boolean){
		//アニメーション設定
		if(pre){
			this.animSettingSub("Anm_LogoStart", "Img_Logo", 0, 3, 3, 0);
			this.animSettingSub("Anm_LogoStop", "Img_Logo", 3, 3, 1, 0);  
		}
		else{
		
		}
    }

    private animSettingSub(animKey:string, imageKey:string, startNo:number, endNo:number, rate:number, repeat:number){
		this.anims.create({
			key: animKey,
			frames: this.anims.generateFrameNumbers(imageKey, { start: startNo, end: endNo }),
			frameRate: rate,
			repeat: repeat
		});
    }
}