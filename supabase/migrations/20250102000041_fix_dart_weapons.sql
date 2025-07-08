-- Fix existing characters that have Dart as a weapon
-- Remove Dart weapons and ensure they have Darts as ammunition

UPDATE characters 
SET weapons = (
  SELECT json_agg(weapon)
  FROM json_array_elements(weapons) AS weapon
  WHERE weapon->>'name' != 'Dart'
)
WHERE weapons::text LIKE '%"name":"Dart"%';

-- Ensure all characters have Darts ammunition if they had Dart weapons
UPDATE characters 
SET ammunition = CASE 
  WHEN ammunition IS NULL THEN '[{"name":"Darts","quantity":10,"compatibleWeapons":["Dart"],"weight":0.05,"cost":"5 cp each"}]'::json
  WHEN NOT EXISTS (
    SELECT 1 FROM json_array_elements(ammunition) AS ammo 
    WHERE ammo->>'name' = 'Darts'
  ) THEN (
    SELECT json_agg(ammo)
    FROM (
      SELECT * FROM json_array_elements(ammunition)
      UNION ALL
      SELECT '{"name":"Darts","quantity":10,"compatibleWeapons":["Dart"],"weight":0.05,"cost":"5 cp each"}'::json
    ) AS ammo
  )
  ELSE ammunition
END
WHERE weapons::text LIKE '%"name":"Dart"%'; 