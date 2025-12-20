# 🌱 NewWorld - Simulación Ecológica

![NewWorld Demo](image1)

> *Un ecosistema virtual inspirado en el legendario **Juego de la Vida de Conway***

## 🎯 Sobre el Proyecto

**NewWorld** nació después de explorar el fascinante [Juego de la Vida de Conway](https://es.wikipedia.org/wiki/Juego_de_la_vida). Lo que empezó como curiosidad se transformó en una simulación ecológica completa donde agentes autónomos luchan por sobrevivir en un mundo dinámico. 

A diferencia del autómata celular clásico, aquí los **agentes** son individuos con hambre, instinto de supervivencia y la necesidad de encontrar recursos en un entorno que cambia constantemente. 

## ✨ Características

🦾 **Agentes Autónomos**
- Sistema de hambre y supervivencia
- Búsqueda inteligente de recursos
- Movimiento adaptativo

🌿 **Ecosistema Dinámico**
- Hierba que crece con el tiempo
- Recursos limitados y renovables
- Balance natural entre población y alimentación

⚡ **Simulación en Tiempo Real**
- Control de velocidad ajustable
- Múltiples tamaños de mundo (x1, x2, x4)
- Visualización instantánea del estado poblacional

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/isegura-b/NewWorld.git

# Entrar al directorio
cd NewWorld

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## 🎮 Cómo Usar

1. **Start**:  Inicia la simulación
2. **Stop**: Pausa el ecosistema
3. **Restart**: Reinicia con una nueva población aleatoria
4. **Speed**:  Controla la velocidad de la simulación (1-500)
5. **Size**: Elige el tamaño del mundo
   - `x1` - 500x500px (20 agentes)
   - `x2` - 1000x1000px (50 agentes)
   - `x4` - 2000x2000px (500 agentes)

## 🧪 Tecnologías

- **TypeScript** - Tipado estático y desarrollo robusto
- **Vite** - Build tool ultra rápido
- **HTML5 Canvas** - Renderizado gráfico eficiente

## 🎨 Cómo Funciona

### El Ciclo de Vida

```typescript
1. Los agentes buscan hierba (verde) para alimentarse
2. Al comer, satisfacen su hambre por 10 turnos
3. Sin comida, pierden hambre cada turno
4. Con hambre = 0, el agente muere
5. La hierba comida se regenera después de 100 ticks
```

### Sistema de Movimiento

Los agentes utilizan un **algoritmo de búsqueda radial** que:
- Busca comida en círculos concéntricos crecientes
- Evita colisiones con otros agentes
- Se mueve aleatoriamente si no encuentra comida cercana

## 🔮 Futuras Mejoras

- [ ] Reproducción de agentes
- [ ] Diferentes tipos de agentes (herbívoros/carnívoros)
- [ ] Estadísticas y gráficas de población
- [ ] Modos de visualización adicionales

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Si tienes ideas para mejorar NewWorld: 

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add:  AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**[⭐ Si te gusta el proyecto, dale una estrella!](https://github.com/isegura-b/NewWorld)**

Hecho con 💚 por [isegura-b](https://github.com/isegura-b)

</div>
