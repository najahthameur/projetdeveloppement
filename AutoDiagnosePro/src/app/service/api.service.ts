import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

private url = 'http://localhost:3000/api/users';
private url1 = 'http://localhost:3000/authapi';
private clientUrl = 'http://localhost:3000/api';
private voitururl1 = 'http://localhost:3000/voitapi';


  constructor(private http: HttpClient) {}

   // ✅ headers avec token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getTest(): Observable<any> {
    return this.http.get(`${this.url}/api/test`);
  }
    register(user: any): Observable<any> {
    return this.http.post(`${this.url}/register`, user);
  }
  login(data: any): Observable<any> {
  return this.http.post(`${this.url1}/loginn`, data);
}
addClient(data: any): Observable<any> {
    return this.http.post(`${this.clientUrl}/clients`, data, {
      headers: this.getHeaders()
    });
  }
updateClient(id: string, data: any): Observable<any> {
  return this.http.put(`${this.clientUrl}/update/${id}`, data,
    {
      headers: this.getHeaders()
    });
  
}
 // ➕ ajouter voiture
  addVoiture(cin: string, data: any): Observable<any> {
    return this.http.post(`${this.voitururl1}/voitures/${cin}`, data,{
      headers: this.getHeaders()
    });
  }
  updateVoiture(id: string, data: any): Observable<any> {
  return this.http.put(`${this.voitururl1}/voitures/${id}`, data,{
      headers: this.getHeaders()
    });
}
getMyGarage(): Observable<any> {
    return this.http.get(`${this.clientUrl}/my-garage`, {
      headers: this.getHeaders()
    });
  }

  getMyVoitures(): Observable<any> {
    return this.http.get(`${this.clientUrl}/my-voitures`, {
      headers: this.getHeaders()
    });
  }


getVoitures() : Observable<any> {
  return this.http.get(`${this.voitururl1}/voitures`,{
      headers: this.getHeaders()
    });
}
getVoitureById(id: string): Observable<any> {
  return this.http.get(`${this.voitururl1}/voitures/${id}`, {
      headers: this.getHeaders()
    });
}
deleteVoiture(id: string): Observable<any> {
  return this.http.delete(`${this.voitururl1}/voitures/${id}`, {
      headers: this.getHeaders()
    });
}
getVoituresByCin(cin: string): Observable<any>  {
  return this.http.get(`${this.voitururl1}/voitures/client/${cin}`,{
      headers: this.getHeaders()
    });
}
deleteClient(cin: string): Observable<any> {
  return this.http.delete(`${this.clientUrl}/clients/${cin}`,{
      headers: this.getHeaders()
    });
}
updateUser(id: string, data: any): Observable<any> {
  return this.http.put(`${this.url}/update/${id}`, data, {
      headers: this.getHeaders()
    });
}
deleteUser(id: string): Observable<any> {
  return this.http.delete(`${this.url}/delete/${id}`,{
      headers: this.getHeaders()});
}
  // 📄 GET CLIENTS (avec token) 
  getClients(): Observable<any> {
    return this.http.get(`${this.clientUrl}/affclients`, {
      headers: this.getHeaders()
    });
  }

  forgotPassword(data: any): Observable<any> {
  return this.http.post(`${this.url1}/forgot-password`, data);
}

resetPassword(data: any): Observable<any> {
  return this.http.post(`${this.url1}/reset-password`, data);
}
}
