import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  videos: string[] = [
    'inspiration1.mp4',
    'inspiration2.mp4',
    'inspiration3.mp4',
  ];
  selectedVideo: string = '';

  @ViewChild('videoElement', { static: false })
  videoElement!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.selectedVideo = this.getRandomVideo();
  }

  ngAfterViewInit(): void {
    this.loadVideo();
    this.setupVideoListeners();
  }

  ngOnDestroy(): void {
    this.removeVideoListeners();
  }

  getRandomVideo(): string {
    if (this.videos.length === 0) {
      return '';
    }
    const randomIndex = Math.floor(Math.random() * this.videos.length);
    return `assets/videos/${this.videos[randomIndex]}`;
  }

  loadVideo(): void {
    const video = this.videoElement.nativeElement;
    const uniqueParam = new Date().getTime(); // Parámetro único para evitar cache
    video.src = `${this.selectedVideo}?${uniqueParam}`;
    video.load(); // Forzar la recarga del video
  }

  setupVideoListeners(): void {
    const video = this.videoElement.nativeElement;
    video.addEventListener('loadeddata', this.onVideoLoaded.bind(this));
  }

  removeVideoListeners(): void {
    const video = this.videoElement.nativeElement;
    video.removeEventListener('loadeddata', this.onVideoLoaded.bind(this));
  }

  onVideoLoaded(): void {
    const video = this.videoElement.nativeElement;
    video.play(); // Reproducir el video cuando esté listo
  }
}
