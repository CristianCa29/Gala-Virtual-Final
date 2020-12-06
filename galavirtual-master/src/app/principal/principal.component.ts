import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  windowChatVisible = false;
  textBtnOpenChat = 'Abrir chat';
  payPalVisible = false;
  videoVisible = true;
  widthVideo = 1000;
  heightVideo = 1000;

 

  chat = false;
  donar = false;
  foto = false;
  facebook = false;
  youtube = false;
  logout = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.redirect();
    this.mostraVideo();
    this.widthScreen();
  }

  mostraVideo(): void {
    const v = localStorage.getItem('v');

    if (v === 'ok') {
      this.videoVisible = false;
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.dimensionesVideo();
    }
  }

  redirect(): void {
    const sesion = localStorage.getItem('sesion');

    if (sesion === 'false' || sesion === null) {
      this.router.navigate(['/login']);
      // this.router.navigate(['/account/login']);
    }
  }

  widthScreen(): void {
    const widthScreen = screen.width;

    setTimeout(() => {
      const menu = document.getElementById('menu');
      const contDescrip = document.getElementById('contDescrip');

      if (widthScreen < 450) {
        menu.style.width = `${widthScreen}px !important`;
        contDescrip.style.width = `${widthScreen}px !important`;
      }
    }, 50);
  }

  openWindowChat(): void {
    const widthScreen = screen.width;

    if (!this.windowChatVisible) {
      this.windowChatVisible = true;
      this.payPalVisible = false;

      if (widthScreen < 450) {
        const contChat = document.getElementById('contChat');
        contChat.style.width = `${widthScreen}px !important`;
      }
    } else {
      this.windowChatVisible = false;
    }
  }

  openDonatePayPal(): void {
    const widthScreen = screen.width;

    if (!this.payPalVisible) {
      this.payPalVisible = true;
      this.windowChatVisible = false;

      if (widthScreen < 450) {
        const contPayPal = document.getElementById('contPayPal');
        contPayPal.style.width = `${widthScreen}px !important`;
      }
    } else {
      this.payPalVisible = false;
    }
  }

  dimensionesVideo(): void {
    this.widthVideo = window.innerWidth;
    this.heightVideo = window.innerHeight;
  }

  onReady(event: YT.PlayerEvent): void {
    event.target.playVideo();
  }

  onStateChange(event: YT.OnStateChangeEvent): void {
    if (event.data === YT.PlayerState.CUED) {
      event.target.playVideo();
    }  else if (event.data === YT.PlayerState.ENDED) {
      this.videoVisible = false;
      localStorage.setItem('v', 'ok');
    }
  }

  logOut(): void {
    localStorage.removeItem('idUser');
    localStorage.removeItem('idChat');
    localStorage.removeItem('nameUser');
    localStorage.removeItem('v');
    localStorage.setItem('sesion', 'false');
    this.authService.logout();
    this.router.navigate(['/login']);
    // this.router.navigate(['/account/login']);
  }
}
