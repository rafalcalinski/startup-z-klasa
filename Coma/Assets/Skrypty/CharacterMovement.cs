using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterMovement : MonoBehaviour
{
    private float horizontal;
    private float vertical;
    public float speed;
    Rigidbody2D rb;
    public Camera cam;

    //health
    public int maxHealth = 100;
    public int currentHealth;

    public HealthBar healthBar;

    Vector2 mousePos;


    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        currentHealth = maxHealth;
        healthBar.SetMaxHealth(maxHealth);
    }
    
    private void OnCollisionEnter2D(Collision2D collision)
    {
        if(collision.gameObject.tag != "bullet")
        {
            currentHealth -= 1;
            healthBar.SetMaxHealth(currentHealth);
        }
        
    }

    // Update is called once per frame
    void Update()
    {
        horizontal = Input.GetAxisRaw("Horizontal");
        vertical = Input.GetAxisRaw("Vertical");

        mousePos = cam.ScreenToWorldPoint(Input.mousePosition);

    }
    void FixedUpdate()
    {
        rb.velocity = new Vector2(horizontal * speed, vertical * speed);

        Vector2 lookDir = mousePos - rb.position;
        float angle = Mathf.Atan2(lookDir.y, lookDir.x) * Mathf.Rad2Deg - 90f;
        rb.rotation = angle;
    }
}
