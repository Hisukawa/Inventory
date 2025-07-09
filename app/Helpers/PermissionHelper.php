<?php

namespace App\Helpers;

class PermissionHelper
{
    public static function getPermissionsForRole($role)
    {
        return match($role) {
            'admin' => ['view_dashboard', 'manage_users', 'manage_rooms', 'manage_equipment'],
            'faculty' => ['view_room', 'report_equipment'],
            'technician' => ['view_room', 'update_status', 'view_reports'],
            'guest' => ['view_room'],
            default => [],
        };
    }
}
