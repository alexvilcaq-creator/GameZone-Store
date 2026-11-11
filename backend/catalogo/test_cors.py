from django.test import TestCase
from django.urls import reverse


class CorsTests(TestCase):
    def test_permite_origenes_locales_de_vite(self):
        for origin in ('http://localhost:5173', 'http://127.0.0.1:5173'):
            with self.subTest(origin=origin):
                response = self.client.get(
                    reverse('catalogo:productos'), HTTP_ORIGIN=origin,
                )
                self.assertEqual(response['Access-Control-Allow-Origin'], origin)

    def test_no_permite_origen_externo(self):
        response = self.client.get(
            reverse('catalogo:productos'), HTTP_ORIGIN='https://otra-tienda.example',
        )
        self.assertNotIn('Access-Control-Allow-Origin', response)

    def test_no_aplica_cors_al_administrador(self):
        response = self.client.get('/admin/login/', HTTP_ORIGIN='http://localhost:5173')
        self.assertNotIn('Access-Control-Allow-Origin', response)
