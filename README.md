# Heidi Schreibwerkstatt

Website: https://PatrickFischerKSA.github.io/Spyri_schreiben/

## Unterrichtszweck
Die Schreibwerkstatt führt nach der Heidi-Lektüre und den Gruppenarbeiten zur [Ausstellung Spyri 200](https://spyri-200-ausstellung.patrickoliverfischer.chatgpt.site/) von belegten Erkenntnissen über einen eigenen Handlungsplan zum Schreiben und Überarbeiten. Vorgesehen sind drei Lektionen, eine Erzählung mit 700–900 Wörtern und höchstens drei Szenen, ein Werkkommentar und drei dokumentierte Überarbeitungen.

Mindestens drei Erkenntnisse (aus der eigenen und einer anderen Gruppe), davon mindestens zwei mit Romanbelegen, prägen Entscheidungen, Konflikte und Folgen. Plausibilität, Motive und Atmosphäre stehen im Vordergrund; die sprachliche Orientierung an Spyri bleibt zurückhaltend, mit Schweizer Rechtschreibung und Guillemets.

## Benutzung
1. Auftrag lesen und Erkenntnisbogen mit eigenen, überprüften Fundstellen ausfüllen.
2. Schreibprompt erstellen, prüfen und selbst in einen kostenlosen ChatGPT-Textchat kopieren – oder anhand desselben Plans ohne KI schreiben.
3. Entwurf überarbeiten, bei Bedarf einen kurzen Prüfprompt verwenden und Änderungen dokumentieren.
4. Notizen regelmässig als JSON herunterladen; über «Notizen laden» wieder einlesen. Die Word-Arbeitsgrundlage ist direkt auf der Website verlinkt.

Bei blockierter Zwischenablage markiert der Kopierknopf den Prompt zum manuellen Kopieren mit ⌘+C oder Strg+C. Verfügbarkeit und Nutzungslimits von ChatGPT können variieren; ein gleichwertiger Arbeitsweg ohne KI bleibt erhalten.

## Technik und Datenschutz
Statische HTML-/CSS-/JavaScript-Website ohne Build-Schritt, Backend, externe Schriftarten oder API. Keine API-Schlüssel, Bezahlfunktionen oder lokale Modellinstallation erforderlich. Die Website erzeugt ausschliesslich kopierbare Prompts und sendet keine Eingaben an KI-Dienste. Eingaben bleiben in `localStorage` dieses Browsers; JSON-Dateien dienen der Sicherung und dem selbst organisierten Austausch. Keine automatische Veröffentlichung von Schülertexten. Keine persönlichen Schülerdaten ins Repository aufnehmen.

## Dateien und Veröffentlichung
- `index.html`: Auftrag, Formular und Gestaltung
- `app.js`: Promptaufbau, Pflichtfeldprüfung, Kopieren, lokale Speicherung und JSON-Import/-Export
- `Heidi_Arbeitsgrundlage_Gruppen.docx`: bearbeitbare Arbeitsgrundlage
- `.nojekyll`: statische Veröffentlichung ohne Jekyll

Alle Dateien liegen im Repository-Stamm. GitHub Pages veröffentlicht den Stammordner `/` des Hauptbranches `main`. Lokal lässt sich `index.html` direkt oder über einen statischen Webserver öffnen.
