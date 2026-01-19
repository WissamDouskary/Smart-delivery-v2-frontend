import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { User, UserRole } from '../../../../core/models/user.model';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './user-list.html',
    styleUrls: ['./user-list.css']
})
export class UserList implements OnInit {
    private userService = inject(UserService);

    users = signal<User[]>([]);
    searchQuery = signal<string>('');
    selectedRole = signal<UserRole | 'All'>('All');

    filteredUsers = computed(() => {
        let result = this.users();
        const query = this.searchQuery().toLowerCase();
        const role = this.selectedRole();

        if (role !== 'All') {
            result = result.filter(u => u.role === role);
        }

        if (query) {
            result = result.filter(u =>
                u.nom.toLowerCase().includes(query) ||
                u.prenom.toLowerCase().includes(query) ||
                (u.email && u.email.toLowerCase().includes(query)) ||
                u.telephone.includes(query)
            );
        }

        return result;
    });

    ngOnInit() {
        this.userService.getAllUsers().subscribe(users => {
            this.users.set(users);
        });
    }

    setRoleFilter(role: UserRole | 'All') {
        this.selectedRole.set(role);
    }
}
