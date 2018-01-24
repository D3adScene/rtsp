import LoginView from './View/Login.html'
import UploadView from './View/Upload.html'
import RtspUrlsView from './View/rtspUrls.html'

export default {
  login:  {
    name: 'login',
    url: '',
    template: LoginView
  },
  upload:  {
    name: 'upload',
    url: '/upload',
    template: UploadView
  },
  rtsp:  {
    name: 'rtsp',
    url: '/rtsp',
    template: RtspUrlsView
  }
}