import {Injectable} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Question} from "../model/Question";
import {FileHandle} from "../model/FileHandle";
import {Slip} from "../model/Slip";

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) {
  }



  private dataURItoBlob1(dataURI: string, mimeType: string): Blob {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array], { type: mimeType });
  }

  public async convertPicByteToPng(picByte: string, fileName: string): Promise<SafeUrl> {
    const byteCharacters = atob(picByte);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const file = new File([blob], `${fileName}.png`, { type: 'image/png' });
    const fileURL = URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustUrl(fileURL);
  }

  // tslint:disable-next-line:typedef
  public creatImages(question: Question) {
    const questionImages: any = question.questionImages;
    const questionImagesToFileHandle: FileHandle[] = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < questionImages.length; i++) {
      const imageFileData = questionImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      questionImagesToFileHandle.push(finalFileHandle);
    }
    question.questionImages = questionImagesToFileHandle;
    return question;
  }

  public creatSlip(slip: Slip) {
    const slipImages: any = slip.slipImages;
    const slipImagesToFileHandle: FileHandle[] = [];
    console.log(slipImages);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < slipImages.length; i++) {
      const imageFileData = slipImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      slipImagesToFileHandle.push(finalFileHandle);
    }
    slip.slipImages = slipImagesToFileHandle;
    return slip;
  }


  public dataURItoBlob(picBytes, imageType) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {type: imageType});
    return blob;
  }




}
