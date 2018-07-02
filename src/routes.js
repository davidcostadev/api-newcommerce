import { Router } from 'express';
import spWebWebsiteMenuSel from './controllers/sp_web_website_menu_sel';
import spWebBuscaMenuSel from './controllers/sp_web_busca_home_sel';
import spWebBuscaMaisVendidosSel from './controllers/sp_web_busca_maisvendidos_sel';
import spWebsiteUrlSel from './controllers/sp_website_url_sel';
import spWebBuscaLandingpageSel from './controllers/sp_web_busca_landingpage_sel';
import spWebBuscaVerticalSel from './controllers/sp_web_busca_vertical_sel';

const router = Router();

router.get('/', (req, res) => {
  res.send({
    apis: {
      v1: { },
    },
  });
});

const namespace = '/api/v1/';

// custom routers

router.post(`${namespace}Tsvmwebsite/sp_web_website_menu_sel`, spWebWebsiteMenuSel);
router.post(`${namespace}Tsvmwebsite/sp_web_busca_home_sel`, spWebBuscaMenuSel);
router.post(`${namespace}Tsvmwebsite/sp_web_busca_ultimasentrada_sel`, spWebBuscaMenuSel);
router.post(`${namespace}Tsvmwebsite/sp_web_busca_maisvisitados_sel`, spWebBuscaMaisVendidosSel);
router.post(`${namespace}Tsvmwebsite/sp_web_busca_maisvendidos_sel`, spWebBuscaMaisVendidosSel);
router.post(`${namespace}Tsvmwebsite/sp_website_url_sel`, spWebsiteUrlSel);
router.post(`${namespace}Tsvmwebsite/sp_web_busca_landingpage_sel`, spWebBuscaLandingpageSel);
router.post(`${namespace}Tsvmwebsite/sp_web_busca_vertical_sel`, spWebBuscaVerticalSel);

export default router;
