import express from 'express';
import { supabase } from '../utils/supabase.js';
import { asyncHandler } from '../middleware/errors.js';
import { validateRequired, successResponse } from '../utils/validation.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('empleados')
    .select('*')
    .limit(100);

  if (error) throw error;
  res.json(successResponse(data));
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('empleados')
    .select('*')
    .eq('id_empleado', req.params.id)
    .single();

  if (error) throw error;
  res.json(successResponse(data));
}));

router.get('/supervisor/:supervisorId/assigned', asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('asignaciones_empleado')
    .select('empleados:id_empleado(*)')
    .eq('id_supervisor', req.params.supervisorId)
    .eq('activo', true);

  if (error) throw error;
  res.json(successResponse(data));
}));

router.post('/', asyncHandler(async (req, res) => {
  validateRequired(req.body, ['nombre', 'rfc']);

  const { data, error } = await supabase
    .from('empleados')
    .insert([req.body])
    .select()
    .single();

  if (error) throw error;
  res.status(201).json(successResponse(data));
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { data, error } = await supabase
    .from('empleados')
    .update(req.body)
    .eq('id_empleado', req.params.id)
    .select()
    .single();

  if (error) throw error;
  res.json(successResponse(data));
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const { error } = await supabase
    .from('empleados')
    .delete()
    .eq('id_empleado', req.params.id);

  if (error) throw error;
  res.json(successResponse({ deleted: true }));
}));

export default router;
