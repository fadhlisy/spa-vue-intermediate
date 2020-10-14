<template>
    <main class="content">
        <div class="content-body container">
            <Editor/>
            <Koleksi/>
            <div class="notif-container">
                <Notifikasi nama="success" label="Berhasil masuk!" pesan="Login berhasil"/>
            </div>
        </div>
    </main>
</template>

<script>
import Editor from './editor/Editor';
import Koleksi from './koleksi/Koleksi';
import Notifikasi from './Notifikasi';

export default {
    components: {
        Editor,
        Koleksi,
        Notifikasi
    }
}
</script>