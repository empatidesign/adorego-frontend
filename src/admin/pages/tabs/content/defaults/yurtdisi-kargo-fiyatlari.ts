export const YURTDISI_KARGO_FIYATLARI_DEFAULT_SECTIONS = [
    {
        type: 'text',
        content: `<h2>Yurtdışı Kargo Fiyatları 2026 <span style="color:#4DB848">(Güncel Liste)</span></h2><p>Yurtdışı kargo fiyatları; gönderim yapılacak ülkeye, paketin ağırlığına ve seçilen teslim süresine göre değişiklik gösterir.</p>`
    },
    {
        type: 'card-grid',
        cards: [
            { icon: 'fa-coins', title: 'En Uygun', description: 'Bütçenize en uygun kargo seçeneğini bulun.' },
            { icon: 'fa-bolt', title: 'En Hızlı', description: 'Acil gönderileriniz için express kargo seçenekleri.' },
            { icon: 'fa-shield-alt', title: 'En Sorunsuz', description: 'Güvenilir teslimat, takip kolaylığı ve minimum sorun.' },
        ]
    },
];
