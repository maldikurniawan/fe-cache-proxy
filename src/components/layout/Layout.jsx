import React, { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import stringSimilarity from "string-similarity";
import ChatBot from "react-chatbotify";
import logo from "../../../public/logo.png";

// components
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [sideOpen, setSideOpen] = useState(
    window.innerWidth < 640 ? false : true
  );

  const helpOptions = [
    "Apa itu proxy server?",
    "Apa itu caching proxy?",
    "Apa itu kode status cache?",
    "Apa itu bandwidth?",
    "Apa itu aksi cache?",
  ];

  const flow = {
    start: {
      message: "Halo! Saya ChatBot Riku, siap membantu Anda. Selamat datang di sesi pertanyaan! 😊",
      transition: { duration: 1000 },
      path: "show_options"
    },
    show_options: {
      message: "Silahkan ketikkan pertanyaan atau pesan yang ingin Anda ajukan. Saya di sini untuk membantu! 📝",
      // options: helpOptions,
      path: "process_options"
    },
    prompt_again: {
      message: "Apakah Anda ingin bertanya lagi? Jika ada pertanyaan lain, saya siap membantu kapan saja! 😊",
      // options: helpOptions,
      path: "process_options"
    },
    unknown_input: {
      message: "Maaf, saya tidak mengerti pesan Anda! Silahkan pilih opsi berikut!",
      options: helpOptions,
      path: "process_options"
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        const userInput = params.userInput.toLowerCase();
        const helpOptionsLower = helpOptions.map(option => option.toLowerCase());

        // Find the best match using string similarity
        const bestMatch = stringSimilarity.findBestMatch(userInput, helpOptionsLower);

        // Check if the similarity score meets a threshold
        if (bestMatch.bestMatch.rating > 0.4) {
          const matchedOption = helpOptions[bestMatch.bestMatchIndex];
          let responseMessage = "";
          switch (matchedOption) {
            case "Apa itu proxy server?":
              responseMessage = `<p><strong>Proxy server</strong> adalah perantara antara pengguna dan internet. Proxy server menerima permintaan dari klien (seperti browser), mengirimkan permintaan tersebut ke server tujuan, dan mengembalikan respons ke klien. Proxy server digunakan untuk meningkatkan keamanan, menyaring konten, dan meningkatkan kecepatan akses dengan menyimpan salinan konten yang sering diminta.</p>`;
              break;
            case "Apa itu caching proxy?":
              responseMessage = `<p><strong>Caching</strong> adalah proses menyimpan salinan data yang sering diakses dalam memori atau penyimpanan sementara. Pada proxy server, caching mengurangi waktu akses dan beban bandwidth dengan menyimpan konten seperti gambar, video, dan halaman web. Ketika pengguna meminta konten yang sudah ada di cache, proxy server dapat menyajikannya lebih cepat daripada harus mengunduhnya lagi dari sumbernya.</p>`;
              break;
            case "Apa itu kode status cache?":
              responseMessage = `<p><strong>Kode status cache</strong> merujuk pada hasil dari interaksi antara klien dan proxy. Berikut adalah penjelasan mengenai masing-masing istilah. </p><ul><li><strong>TCP Hit:</strong> Konten ditemukan di cache dan dikirim ke klien.</li><li><strong>TCP Miss:</strong> Konten tidak ditemukan di cache dan harus diambil dari server asal.</li><li><strong>TCP Tunnel:</strong> Mengalirkan data tanpa menyimpannya di cache, biasanya untuk koneksi aman.</li><li><strong>TCP Denied:</strong> Akses ke permintaan klien ditolak berdasarkan kebijakan konfigurasi.</li></ul>`;
              break;
            case "Apa itu bandwidth?":
              responseMessage = `<p><strong>Bandwidth</strong> adalah kapasitas maksimum data yang dapat ditransfer melalui jaringan dalam periode waktu tertentu, biasanya diukur dalam megabit per detik (Mbps). Bandwidth yang lebih tinggi memungkinkan lebih banyak data untuk ditransfer sekaligus, yang dapat meningkatkan kecepatan akses dan kinerja proxy server. Namun, jika bandwidth terbatas, maka transfer data menjadi lambat, mempengaruhi waktu respon dan pengalaman pengguna.</p>`;
              break;
            case "Apa itu aksi cache?":
              responseMessage = `<p><strong>Aksi cache</strong> adalah tindakan yang dilakukan oleh server proxy untuk mengelola data yang disimpan dalam cache. </p><ul><li><strong>CREATE:</strong> Menyimpan konten baru ke dalam cache saat permintaan pertama kali diterima.</li><li><strong>RELEASE:</strong> Menghapus konten dari cache, biasanya karena sudah tidak diperlukan atau untuk membebaskan ruang.</li><li><strong>SWAPOUT:</strong> Memindahkan konten dari cache ke penyimpanan yang lebih lambat atau tidak aktif untuk memberikan ruang bagi konten baru.</li><li><strong>SWAPIN:</strong> Mengambil konten dari penyimpanan yang lebih lambat dan memasukkannya kembali ke dalam cache untuk digunakan kembali.</li></ul>`;
              break;
            case "Apa itu latency?":
              responseMessage = `<p><strong>Latency</strong> adalah waktu yang dibutuhkan untuk mengirimkan data dari sumber ke tujuan. Biasanya diukur dalam milidetik (ms), latency yang lebih rendah berarti komunikasi antara klien dan server lebih cepat, sedangkan latency yang tinggi dapat menyebabkan keterlambatan dalam proses transfer data, yang mempengaruhi pengalaman pengguna, terutama dalam aplikasi yang membutuhkan respons cepat.</p>`;
              break;
            default:
              return "unknown_input";
          }
          await params.injectMessage(responseMessage);
          return "repeat";
        } else {
          // If no match is found or similarity is low
          return "unknown_input";
        }
      },
    },
    repeat: {
      transition: { duration: 2000 },
      path: "prompt_again"
    },
  }
  return (
    <Fragment>
      <div className="flex ">
        <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
        <div className="w-full h-screen overflow-clip flex flex-col">
          <Header sideOpen={sideOpen} setSideOpen={setSideOpen} />
          <div className="bg-slate-100 dark:bg-[#334155] h-full overflow-y-auto custom-scroll px-8 py-10">
            <Outlet />
          </div>
        </div>
        <ChatBot
          settings={{
            tooltip: { text: false, mode: false },
            general: { showFooter: false },
            notification: { showCount: false },
            header: { title: "Riku" },
            botBubble: { dangerouslySetInnerHtml: true },
            chatButton: { icon: logo }
          }}
          flow={flow}
        />
      </div>
    </Fragment>
  );
};

export default Layout;
