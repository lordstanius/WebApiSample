import { environment } from '../../../environments/environment';

export class Helper {
  static getApiUrlForService(service): string {
    const className = service.constructor.name;
    return environment.baseUrl + className.substring(0, className.indexOf('Service')) + '/';
  }
}
