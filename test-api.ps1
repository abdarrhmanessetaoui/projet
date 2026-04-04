$BASE = "http://localhost:3000/api/produits"

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " POST - Creer un produit" -ForegroundColor Cyan
Write-Host "============================================`n"

$body = [System.Text.Encoding]::UTF8.GetBytes('{"nom":"Laptop Dell XPS 13","description":"Ordinateur portable haute performance","prix":1299.99,"quantite":15,"categorie":"Electronique"}')

$created = Invoke-RestMethod -Uri $BASE -Method POST `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$created | ConvertTo-Json -Depth 5
$ID = $created.data._id
Write-Host "`nID du produit cree : $ID" -ForegroundColor Yellow

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " GET - Tous les produits" -ForegroundColor Cyan
Write-Host "============================================`n"
Invoke-RestMethod -Uri $BASE | ConvertTo-Json -Depth 5

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " GET - Avec pagination et filtre" -ForegroundColor Cyan
Write-Host "============================================`n"
Invoke-RestMethod -Uri "$BASE`?page=1&limit=5&categorie=Electronique" | ConvertTo-Json -Depth 5

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " GET - Un produit par ID" -ForegroundColor Cyan
Write-Host "============================================`n"
Invoke-RestMethod -Uri "$BASE/$ID" | ConvertTo-Json -Depth 5

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " PUT - Remplacer le produit" -ForegroundColor Cyan
Write-Host "============================================`n"
$putBody = [System.Text.Encoding]::UTF8.GetBytes('{"nom":"Laptop Dell XPS 13 (2024)","description":"Ordinateur portable derniere generation","prix":1499.99,"quantite":20,"categorie":"Electronique"}')
Invoke-RestMethod -Uri "$BASE/$ID" -Method PUT `
  -ContentType "application/json; charset=utf-8" `
  -Body $putBody | ConvertTo-Json -Depth 5

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " PATCH - Modifier partiellement (prix)" -ForegroundColor Cyan
Write-Host "============================================`n"
$patchBody = [System.Text.Encoding]::UTF8.GetBytes('{"prix":1199.99}')
Invoke-RestMethod -Uri "$BASE/$ID" -Method PATCH `
  -ContentType "application/json; charset=utf-8" `
  -Body $patchBody | ConvertTo-Json -Depth 5

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " GET - Recherche (search?q=laptop)" -ForegroundColor Cyan
Write-Host "============================================`n"
Invoke-RestMethod -Uri "$BASE/search?q=laptop" | ConvertTo-Json -Depth 5

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " DELETE - Supprimer le produit" -ForegroundColor Cyan
Write-Host "============================================`n"
Invoke-RestMethod -Uri "$BASE/$ID" -Method DELETE | ConvertTo-Json -Depth 5

Write-Host "`n============================================" -ForegroundColor Green
Write-Host " TOUS LES TESTS TERMINES !" -ForegroundColor Green
Write-Host "============================================`n"
