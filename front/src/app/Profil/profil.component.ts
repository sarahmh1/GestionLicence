import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/Services/api.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileImageUrl: string = 'assets/img/avatar.png';
  currentUser: any = null;
  selectedFile: File | null = null;
  uploading = false;
  uploadProgress = 0;
  updating = false;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      sex: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9+]{8,15}$/)]],
      email: [{value: '', disabled: true}],
      role: [{value: '', disabled: true}],
      verified: [{value: false, disabled: true}]
    });
  }

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.loading = true;
    this.errorMessage = null;

    this.apiService.get('/Users/me').subscribe({
      next: (user: any) => {
        this.handleUserData(user);
      },
      error: (error: any) => {
        this.handleError(error);
      }
    });
  }

  private handleError(error: any) {
    console.error('Erreur lors du chargement du profil:', error);
    
    if (error.status === 401 || error.status === 403) {
      this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      localStorage.removeItem('auth_token');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } else if (error.status === 404) {
      this.errorMessage = 'Service temporairement indisponible';
    } else if (error.status === 0) {
      this.errorMessage = 'Serveur inaccessible. Vérifiez que le backend est démarré.';
    } else {
      this.errorMessage = 'Erreur lors du chargement du profil';
    }
    
    this.loading = false;
  }

  private handleUserData(user: any) {
    if (!user) {
      this.errorMessage = 'Aucune donnée utilisateur reçue';
      this.loading = false;
      return;
    }
    
    this.currentUser = user;
    console.log('✅ Utilisateur chargé:', user);
    
    this.updateProfileImageUrl(user.profilePicture);
    
    this.populateProfileForm(user);
    this.loading = false;
  }

  private updateProfileImageUrl(profilePicture: string | null) {
    if (profilePicture) {
      let imageUrl = profilePicture;
      
      // ✅ CORRECTION IMPORTANTE : Utilisez le bon endpoint
      if (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
        // Si c'est juste un nom de fichier (ex: "user_1652_abc123.jpg")
        if (!imageUrl.includes('/')) {
          imageUrl = 'http://localhost:8089/Users/serve-img/' + imageUrl;
        } 
        // Si c'est un chemin complet (ex: "/uploads/profiles/user_1652_abc123.jpg")
        else {
          imageUrl = 'http://localhost:8089' + imageUrl;
        }
      }
      
      // ✅ Ajouter un timestamp unique pour éviter le cache
      const timestamp = new Date().getTime();
      this.profileImageUrl = imageUrl + (imageUrl.includes('?') ? '&' : '?') + 't=' + timestamp;
      console.log('🖼️ URL image mise à jour:', this.profileImageUrl);
    } else {
      this.profileImageUrl = 'assets/img/avatar.png';
    }
  }

  private populateProfileForm(user: any) {
    let formattedDate = '';
    if (user.dateOfBirth) {
      try {
        const date = new Date(user.dateOfBirth);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toISOString().split('T')[0];
        }
      } catch (e) {
        console.warn('Format de date invalide:', user.dateOfBirth);
      }
    }

    this.profileForm.patchValue({
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      dateOfBirth: formattedDate,
      sex: user.sex || '',
      phoneNumber: user.phoneNumber || '',
      email: user.email || '',
      role: user.role || '',
      verified: user.verified || false
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }

    // Vérification que l'utilisateur est chargé
    if (!this.currentUser || !this.currentUser.id) {
      alert('Profil utilisateur non chargé. Veuillez patienter...');
      this.loadCurrentUser();
      return;
    }

    // Validation du type de fichier
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      alert('Type de fichier non supporté. Utilisez JPEG, PNG, GIF ou WebP.');
      return;
    }

    // Validation de la taille
    if (file.size > 5 * 1024 * 1024) {
      alert('La taille de l\'image ne doit pas dépasser 5MB');
      return;
    }

    this.selectedFile = file;

    // Aperçu immédiat de l'image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImageUrl = e.target.result;
    };
    reader.readAsDataURL(file);

    // Démarrer l'upload après un court délai pour que l'aperçu s'affiche
    setTimeout(() => {
      this.uploadProfilePicture();
    }, 100);
  }

  uploadProfilePicture() {
    if (!this.selectedFile) {
      alert('Aucun fichier sélectionné');
      return;
    }

    // Vérification renforcée
    if (!this.currentUser || !this.currentUser.id) {
      console.error('❌ Impossible upload: currentUser ou ID manquant');
      alert('Erreur de profil utilisateur. Veuillez actualiser la page.');
      return;
    }

    this.uploading = true;
    this.uploadProgress = 0;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const userId = this.currentUser.id;
    console.log('📤 Upload pour user ID:', userId);

    this.apiService.upload(`/Users/${userId}/profile-picture`, formData).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.handleUploadSuccess(event.body);
        }
      },
      error: (error: any) => {
        this.handleUploadError(error);
      }
    });
  }

  private handleUploadSuccess(response: any) {
    console.log('✅ Upload réussi:', response);
    
    // Mettre à jour l'image immédiatement
    if (response.profilePicture) {
      this.updateProfileImageUrl(response.profilePicture);
    }
    
    // Mettre à jour les données utilisateur
    if (response.user) {
      this.currentUser = response.user;
    }
    
    this.uploading = false;
    
    // Message de succès avec délai
    setTimeout(() => {
      alert('Photo de profil mise à jour avec succès!');
      
      // Recharger les données pour synchronisation complète
      this.loadCurrentUser();
    }, 300);
  }

  private handleUploadError(error: any) {
    console.error('❌ Erreur upload:', error);
    this.uploading = false;
    
    let errorMessage = 'Erreur lors de la mise à jour de la photo';
    
    if (error.status === 400) {
      errorMessage = 'Fichier invalide ou format non supporté';
    } else if (error.status === 401) {
      errorMessage = 'Session expirée - Veuillez vous reconnecter';
      this.logout();
    } else if (error.status === 413) {
      errorMessage = 'Fichier trop volumineux (max 5MB)';
    } else if (error.status === 500) {
      errorMessage = 'Erreur serveur - Veuillez réessayer';
    }
    
    alert(errorMessage);
    this.resetProfileImage();
  }

  private resetProfileImage() {
    // Revenir à l'image précédente avec timestamp
    if (this.currentUser?.profilePicture) {
      this.updateProfileImageUrl(this.currentUser.profilePicture);
    } else {
      this.profileImageUrl = 'assets/img/avatar.png';
    }
  }

  onImageError() {
    console.log('❌ Erreur de chargement de l\'image, rechargement...');
    
    // Forcer le rechargement avec un nouveau timestamp
    if (this.currentUser?.profilePicture) {
      this.updateProfileImageUrl(this.currentUser.profilePicture);
    } else {
      this.profileImageUrl = 'assets/img/avatar.png';
    }
  }

  updateProfile() {
    if (this.profileForm.valid && this.currentUser) {
      this.updating = true;

      const updateData = {
        firstname: this.profileForm.get('firstname')?.value,
        lastname: this.profileForm.get('lastname')?.value,
        dateOfBirth: this.profileForm.get('dateOfBirth')?.value,
        sex: this.profileForm.get('sex')?.value,
        phoneNumber: this.profileForm.get('phoneNumber')?.value
      };

      this.apiService.put(`/Users/${this.currentUser.id}`, updateData).subscribe({
        next: (user: any) => {
          this.currentUser = { ...this.currentUser, ...user };
          this.updating = false;
          alert('Profil mis à jour avec succès!');
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.updating = false;
          alert('Erreur lors de la mise à jour du profil');
        }
      });
    }
  }

  getRoleDisplayName(role: string): string {
    const roleMap: { [key: string]: string } = {
      'ROLE_ADMINISTRATEUR': 'Administrateur',
      'ROLE_COMMERCIAL': 'Commercial',
      'ROLE_MANAGER': 'Manager'
    };
    return roleMap[role] || role;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  reloadPage() {
    location.reload();
  }

  // Méthode pour forcer le rechargement de l'image
  forceImageReload() {
    if (!this.currentUser?.profilePicture) return;
    
    this.updateProfileImageUrl(this.currentUser.profilePicture);
  }

  // ✅ NOUVELLE méthode pour tester l'accès aux images
  testImageAccess() {
    if (this.currentUser?.profilePicture) {
      const testUrl = 'http://localhost:8089/Users/serve-img/' + this.currentUser.profilePicture;
      console.log('🧪 Test URL:', testUrl);
      window.open(testUrl, '_blank');
    }
  }
}