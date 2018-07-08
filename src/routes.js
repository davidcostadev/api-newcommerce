import { Router } from 'express';
import dotenv from 'dotenv';
import spWebWebsiteMenuSel from './controllers/sp_web_website_menu_sel';
import spWebBuscaMenuSel from './controllers/sp_web_busca_home_sel';
import spWebBuscaMaisVendidosSel from './controllers/sp_web_busca_maisvendidos_sel';
import spWebsiteUrlSel from './controllers/sp_website_url_sel';
import spWebBuscaLandingpageSel from './controllers/sp_web_busca_landingpage_sel';
import spWebBuscaVerticalSel from './controllers/sp_web_busca_vertical_sel';
import ProductImages from './controllers/ProductImages';
import Offers from './controllers/Offers';

dotenv.config();

const router = Router();

const domain = process.env.DOMAIN;
const namespace = process.env.NAMESPACE;

router.get('/', (req, res) => {
  res.send({
    apis: {
      v1: {
        Tsvmwebsite: [
          `${domain}${namespace}Tsvmwebsite/sp_web_website_menu_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_home_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_ultimasentrada_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_maisvisitados_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_maisvendidos_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_website_url_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_landingpage_sel`,
          `${domain}${namespace}Tsvmwebsite/sp_web_busca_vertical_sel`,
          `${domain}${namespace}offers`,
          `${domain}${namespace}offers/:id`,
          `${domain}${namespace}products/:id/images`,
        ],
      },
    },
  });
});

// custom routers

router.all(`${namespace}Tsvmwebsite/sp_web_website_menu_sel`, spWebWebsiteMenuSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_home_sel`, spWebBuscaMenuSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_ultimasentrada_sel`, spWebBuscaMenuSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_maisvisitados_sel`, spWebBuscaMaisVendidosSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_maisvendidos_sel`, spWebBuscaMaisVendidosSel);
router.all(`${namespace}Tsvmwebsite/sp_website_url_sel`, spWebsiteUrlSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_landingpage_sel`, spWebBuscaLandingpageSel);
router.all(`${namespace}Tsvmwebsite/sp_web_busca_vertical_sel`, spWebBuscaVerticalSel);

router.get(`${namespace}products/:id/images`, ProductImages.list);
router.get(`${namespace}offers`, Offers.list);
router.get(`${namespace}offers/:id`, Offers.get);

export default router;
