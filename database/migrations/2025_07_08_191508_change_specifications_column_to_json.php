<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('equipments', function (Blueprint $table) {
            $table->json('specifications')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('equipments', function (Blueprint $table) {
            $table->longText('specifications')->nullable()->change();
        });
    }
};
